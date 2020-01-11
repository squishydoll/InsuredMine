import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { of, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Subject<boolean>;
  url;
  authenticateUrl;
  userSubject: Subject<any>;
  constructor(private dataService: DataService, private http: HttpClient) {
    this.url = 'http://localhost:4000/';
    this.authenticateUrl = this.url + 'users/authenticate';
    this.userSubject = new Subject();
    this.isLoggedIn = new Subject();
  }

  logIn(userid: string, password: string) {
    let payload = {
      username: userid,
      password: password
    };
    return this.http.post(this.authenticateUrl, payload);
  }
  logOut() {
    localStorage.removeItem('token');
  }
}
