import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_collaborators/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValidated: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authSevice: AuthService
  ) {}

  ngOnInit() {
    this.isValidated = true;
    this.loginForm = new FormGroup({
      userid: new FormControl(''),
      password: new FormControl('')
    });
  }

  submit() {
    let url = '';
    let finalUrlValue = '';
    this.activatedRoute.queryParamMap.subscribe(qParams => {
      url = qParams.get('redirectTo');
      finalUrlValue = url || '/home';
      this.authSevice.logIn(this.userid.value, this.password.value).subscribe(
        (output: any) => {
          this.authSevice.userSubject.next(output.username);
          this.authSevice.isLoggedIn.next(true);
          localStorage.setItem('token', output.token);
          this.router.navigate([finalUrlValue]);
        },
        error => console.error(error)
      );
    });
  }

  get userid() {
    return this.loginForm.controls['userid'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
