import { User } from '../../models';

export default interface CartContextManager {
  sessionId?: string;
  setSessionId: (sessionId: string) => void;
  getSessionId: () => string;
  user?: User;
  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  getUser: () => User;
  logoutUser: () => void;
}
