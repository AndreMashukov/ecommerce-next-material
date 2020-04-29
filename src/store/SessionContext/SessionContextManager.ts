export default interface CartContextManager {
  setSessionId: (sessionId: string) => void;
  sessionId: string;
}