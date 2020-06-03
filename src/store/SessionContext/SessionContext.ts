import React from 'react';
import SessionContextManager from './SessionContextManager';

const SessionContext = React.createContext<SessionContextManager>({
  setSessionId: null,
  getSessionId: null,
  sessionId: null,
  token: null,
  setToken: null,
  getToken: null
});

export default SessionContext;
