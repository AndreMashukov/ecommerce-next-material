export default interface CartContextManager {
  setSessionId: (sessionId: string) => void;
  getSessionId: () => string;
  sessionId: string;
}