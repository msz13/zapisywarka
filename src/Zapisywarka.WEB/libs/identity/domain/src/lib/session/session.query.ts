import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStore, UserSession } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<UserSession> {
  constructor(protected store: SessionStore) {
    super(store);
  }

  isLoggedIn(): Observable<boolean> {
    return this.select('id').pipe(map((id) => !!id));
  }
}
