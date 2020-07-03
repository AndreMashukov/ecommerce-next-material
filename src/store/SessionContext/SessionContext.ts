import React from 'react';
import SessionContextManager from './SessionContextManager';

const SessionContext = React.createContext<SessionContextManager>({
  setSessionId: null,
  getSessionId: null,
  sessionId: null,
  user: null,
  setUser: null,
  getUser: null,
  updateUser: null,
  logoutUser: null
});

export default SessionContext;
