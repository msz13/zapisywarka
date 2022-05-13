import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserSession {
  id: string;
  userName: string;
}

export function createInitialState(): UserSession {
  return {
    id: '',
    userName: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<UserSession> {
  constructor() {
    super(createInitialState());
  }
}
