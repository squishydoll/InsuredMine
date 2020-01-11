import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_collaborators/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName: string;
  loginValid: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loginState.subscribe(el => {
      (this.firstName = el.firstName), (this.loginValid = el.isLoggedIn);
    });
  }

  logout() {
    let finalDecision = confirm('Are you sure to logout') ? true : false;
    if (finalDecision) {
      this.authService.loginState.next({
        firstName: '',
        isLoggedIn: false
      });
      this.authService.logOut();
      this.router.navigate(['']);
    }
  }
}
