import { useReducer } from 'react';
import SessionContext from './SessionContext';
import sessionReducer from './reducers/sessionReducer';
import TYPES from './reducers/types';

// tslint:disable-next-line: no-any
const SessionProvider: React.FunctionComponent<{}> = (props: any) => {
  const {_sessionId} = props;
  const [state, dispatch] = useReducer(sessionReducer, {sessionId: _sessionId});

  function setSessionId(sessionId: string): void {
    dispatch({ type: TYPES.SESSION_SET, sessionId });
  }

  function getSessionId(): string {
    return state.sessionId;
  }

  return (
    <SessionContext.Provider value={{
      setSessionId,
      getSessionId
    }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;