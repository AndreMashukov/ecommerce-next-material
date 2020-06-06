import { SessionAction, SessionState } from './models';
import TYPES from './types';

export default function sessionReducer(
  state: SessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case TYPES.SESSION_SET:
      return { ...state, ...{ sessionId: action.sessionId } };
    case TYPES.USER_SET:
      return { ...state, ...{ user: action.user } };
    default:
      return state;
  }
}
