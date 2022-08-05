import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  LoginModel,
  SignUpModel,
  UserEntity,
} from '../core/models/user.model';
import { tap } from 'rxjs/operators';
import { loginUrl, signupUrl } from '../core/common/constants';
import { Router } from '@angular/router';
import { UserRole } from '../core/common/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;
  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.baseUrl + '/auth';
  }

  signUp(signupModel: SignUpModel) {
    return this.http
      .post<UserEntity>(signupUrl, {
        displayName: signupModel.role,
        email: signupModel.email,
        password: signupModel.password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.idToken);
        })
      );
  }

  logIn(loginForm: LoginModel) {
    return this.http
      .post<UserEntity>(loginUrl, {
        email: loginForm.email,
        password: loginForm.password,
        returnSecureToken: true,
      })
      .pipe(tap((res) => localStorage.setItem('token', res.idToken)));
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  isOffer(): boolean {
    return JSON.parse(localStorage.getItem('user')!).displayName == UserRole.OFFER;
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
