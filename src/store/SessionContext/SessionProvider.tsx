import { useReducer } from 'react';
import SessionContext from './SessionContext';
import sessionReducer from './reducers/sessionReducer';
import TYPES from './reducers/types';
import { User } from '../../models';

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

  function setUser(user: User): void {
    dispatch({ type: TYPES.USER_SET, user });
  }

  function getUser(): User {
    return state.user;
  }

  return (
    <SessionContext.Provider value={{
      setSessionId,
      getSessionId,
      getUser,
      setUser
    }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;