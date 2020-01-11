import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_collaborators/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  loginValid: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSubject.subscribe(el => (this.username = el));
    this.authService.isLoggedIn.subscribe(el => (this.loginValid = el));
  }

  logout() {
    let finalDecision = confirm('Are you sure to logout') ? true : false;
    if (finalDecision) {
      //this.authService.userSubject.next();
      this.authService.isLoggedIn.next(false);
      this.authService.logOut();
      this.router.navigate(['']);
    }
  }
}
