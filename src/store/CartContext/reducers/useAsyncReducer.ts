import { useState } from 'react';

// tslint:disable-next-line: no-any
const _initialState: any = null;

// tslint:disable-next-line: no-any
const useAsyncReducer = (reducer: any, initialState = _initialState) => {
  const [state, setState] = useState(initialState);

  // tslint:disable-next-line: no-any
  const dispatch = async (action: any) => {
    const result = reducer(state, action);
    if (typeof result.then === 'function') {
      try {
        const newState = await result;
        setState(newState);
      } catch (err) {
        setState({ ...state, error: err });
      }
    } else {
      setState(result);
    }
  };

  return [state, dispatch];
}

export default useAsyncReducer;
