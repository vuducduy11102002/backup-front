import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURLAuth = environment.apiURL + 'user';
  private email = '';
  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLAuth}/login`, {
      email,
      password,
    });
  }

  authentication(email: string, otp: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLAuth}/2fa`, {
      email,
      otp,
    });
  }

  logout() {
    this.token.RemoveToken();
    this.router.navigate(['/login']);
  }

  setEmail(value: string) {
    this.email = value;
  }

  getEmail(): string {
    return this.email;
  }
}
