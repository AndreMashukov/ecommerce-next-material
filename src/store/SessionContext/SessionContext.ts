import React from 'react';
import SessionContextManager from './SessionContextManager';

const SessionContext = React.createContext<SessionContextManager>({
  setSessionId: null,
  getSessionId: null,
  sessionId: null
});

export default SessionContext;
