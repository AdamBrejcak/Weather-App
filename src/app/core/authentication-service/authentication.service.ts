import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userLoggedSource = new BehaviorSubject(this.initLoggedUser());
  public readonly userLogged = this.userLoggedSource.asObservable();

  constructor() {}

  private initLoggedUser(): Object {
    if (sessionStorage.getItem('loggedUser')) {
      return JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    }
    return {};
  }

  loginUser(name: string, password: string): Observable<boolean> {
    let user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');

    if ((name === user.name || name === 'admin') && password === 'admin') {
      this.userLoggedSource.next({ loggedIn: true, name: name });
      sessionStorage.setItem('loggedUser', JSON.stringify({ loggedIn: true, name: name }));
      return of(true);
    } else {
      this.userLoggedSource.next({ loggedIn: false, name: '' });
      return of(false);
    }
  }

  logoutUser(): void {
    let user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    this.userLoggedSource.next({ loggedIn: false, name: user.name });
    sessionStorage.setItem('loggedUser', JSON.stringify({ loggedIn: false, name: user.name }));
  }

  changeUserName(name: string): string {
    this.userLoggedSource.next({ loggedIn: true, name: name });
    sessionStorage.setItem('loggedUser', JSON.stringify({ loggedIn: false, name: name }));
    return JSON.parse(sessionStorage.getItem('loggedUser') || '{}')
  }
}
