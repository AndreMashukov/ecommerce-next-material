export default interface CartContextManager {
  setSessionId: (sessionId: string) => void;
  getSessionId: () => string;
  sessionId?: string;
  token?: string;
  setToken: (token: string) => void;
  getToken: () => string;
}
