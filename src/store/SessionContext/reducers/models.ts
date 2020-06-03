import TYPES from './types';

export interface SessionState {
  sessionId: string;
  token?: string;
}

export interface SessionAction {
  type: TYPES;
  sessionId?: string;
  token?: string;
}