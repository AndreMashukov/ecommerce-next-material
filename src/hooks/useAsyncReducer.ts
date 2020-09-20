import { useState } from 'react';
import { Subscription } from 'rxjs';
// import { CartState } from '../store/CartContext/reducers/models';
// tslint:disable-next-line: no-any
const _initialState: any = null;

// tslint:disable-next-line: no-any
const useAsyncReducer = <T, K>(
  reducer: (st: T, a: K, sb: Subscription) => Promise<T>,
  initialState = _initialState as T
) => {
  const [state, setState] = useState<T>(initialState);

  // tslint:disable-next-line: no-any
  const dispatch = async (action: K, callback?: (state: T) => void) => {
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
      setState(await result);
    }
    subscriptions.unsubscribe();
  };
  return  { state, dispatch };
};

export default useAsyncReducer;
