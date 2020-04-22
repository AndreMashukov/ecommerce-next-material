import TYPES from './types';

export interface SessionState {
  sessionId: number;
}

export interface SessionAction {
  type: TYPES;
  sessionId?: number;
}