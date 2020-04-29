import React from 'react';
import SessionContextManager from './SessionContextManager';

const SessionContext = React.createContext<SessionContextManager>({
  // tslint:disable-next-line: no-console
  setSessionId: (sessionId: string) => console.log(sessionId),
  sessionId: undefined
});

export default SessionContext;
