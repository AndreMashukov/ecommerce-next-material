import { SessionAction, SessionState } from './models';
import TYPES from './types';
import { storeUser } from '../../../utils/User';

export default function sessionReducer(
  state: SessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case TYPES.SESSION_SET:
      return { ...state, ...{ sessionId: action.sessionId } };
    case TYPES.USER_SET:
      storeUser(action.user);
      return { ...state, ...{ user: action.user } };
    default:
      return state;
  }
}
