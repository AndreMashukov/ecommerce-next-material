import { useReducer } from 'react';
import SessionContext from './SessionContext';
import sessionReducer from './reducers/sessionReducer';
import TYPES from './reducers/types';

// tslint:disable-next-line: no-any
const SessionProvider: React.FunctionComponent<{}> = (props: any) => {
  const [state, dispatch] = useReducer(sessionReducer, {sessionId: 0});

  function setSessionId(sessionId: number): void {
    // tslint:disable-next-line: no-console
    console.log('setSessionId', sessionId);
    dispatch({ type: TYPES.SESSION_SET, sessionId });
  }

  return (
    <SessionContext.Provider value={{
      setSessionId,
      sessionId: state.sessionId
    }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;