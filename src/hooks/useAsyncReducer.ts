import { useState } from 'react';
import { Subscription  } from 'rxjs';
import { CartState } from '../store/CartContext/reducers/models';
// tslint:disable-next-line: no-any
const _initialState: any = null;

// tslint:disable-next-line: no-any
const useAsyncReducer = (reducer: any, initialState = _initialState) => {
  const [state, setState] = useState(initialState);

  // tslint:disable-next-line: no-any
  const dispatch = async (action: any, callback?: (state: CartState) => void) => {
    const subscriptions = new Subscription();
    const result = reducer(state, action, subscriptions);
    if (typeof result.then === 'function') {
      try {
        const newState = await result;
        setState(newState);
        if (typeof callback === 'function') {
          callback(newState);
        }
      } catch (err) {
        setState({ ...state, error: err });
      }
    } else {
      setState(result);
    }
    subscriptions.unsubscribe();
  };
  return [state, dispatch];
};

export default useAsyncReducer;
