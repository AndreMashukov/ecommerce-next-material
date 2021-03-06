import { SessionAction, SessionState } from './models';
import TYPES from './types';
import { storeUser, removeUser, retrieveUser } from '../../../utils/User';

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
      case TYPES.USER_UPDATE:
        const oldVersion = retrieveUser();
        const newVersion = {...oldVersion, ...action.updatedUser};
        storeUser(newVersion);
        return { ...state, ...{ user: newVersion } };
    case TYPES.USER_LOGOUT:
      removeUser();
      const newState = state;
      delete newState.user;
      return { ...newState};
    default:
      return state;
  }
}
