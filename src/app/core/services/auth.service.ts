import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../models/login.DTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _environment: environment = new environment();
  private authUrl: string = '';

  private _loggedIn = new BehaviorSubject<boolean>(null);

  public get loggedIn(): BehaviorSubject<boolean> {
    return this._loggedIn;
  }

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }
  public get hasAuthenticate(): boolean {
    var i = 1;
    return this.storageService.token != null;
  }

  public isFirstLogin: boolean = false;
  constructor(
    public router: Router,
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
    this.authUrl = this._environment.autAPI.getToken;
  }
  public login(credentials: LoginDTO): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.authUrl, credentials);
  }
  public logout() {
    const me = this;

    me.clearLocalStorage();
    me._loggedIn.next(false);
  }

  public clearLocalStorage() {
    const me = this;

    localStorage.clear();
  }
}
