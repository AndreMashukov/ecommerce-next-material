import TYPES from './types';

export interface SessionState {
  sessionId: string;
}

export interface SessionAction {
  type: TYPES;
  sessionId?: string;
}