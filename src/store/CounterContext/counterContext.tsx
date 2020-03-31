
import React from 'react';
import createActions from './createActions';
import useAsyncReducer from './useAsyncReducer';
import reducer, { initialState } from './reducer';

export const CounterContext = React.createContext([
]);

// tslint:disable-next-line: no-any
export const CounterProvider = ({ children }: any) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);
  const actions = createActions(dispatch);

  return (
    <CounterContext.Provider value={[state, actions]}>
      {children}
    </CounterContext.Provider>
  );
};