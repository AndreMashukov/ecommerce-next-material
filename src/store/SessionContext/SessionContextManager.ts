export default interface CartContextManager {
  setSessionId: (sessionId: number) => void;
  sessionId: number;
}