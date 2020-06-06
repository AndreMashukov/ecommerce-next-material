import TYPES from './types';
import { User } from '../../../models';

export interface SessionState {
  sessionId: string;
  user?: User;
}

export interface SessionAction {
  type: TYPES;
  sessionId?: string;
  user?: User;
}