import { SessionAction, SessionState } from './models';
import TYPES from './types';

export default function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case TYPES.SESSION_SET:
      return { sessionId: action.sessionId };
    default:
      return state;
  }
}
