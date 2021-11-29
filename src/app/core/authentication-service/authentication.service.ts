import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userLoggedSource = new BehaviorSubject(this.initLoggedUser());

  public readonly userLogged = this.userLoggedSource.asObservable();

  constructor() {}

  private initLoggedUser(): boolean {
    if (sessionStorage.getItem('loggedUser')) {
      return !!JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    }
    return false;
  }

  loginUser(name: string, password: string): Observable<boolean> {
    if (name === 'admin' && password === 'admin') {
      this.userLoggedSource.next(true);
      sessionStorage.setItem('loggedUser', JSON.stringify(name));
      return of(true);
    } else {
      this.userLoggedSource.next(false);
      return of(false);
    }
  }

  logoutUser(): void {
    this.userLoggedSource.next(false);
    sessionStorage.removeItem('loggedUser');
  }
}
