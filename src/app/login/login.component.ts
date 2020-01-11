import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      userid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    let url = '';
    let finalUrlValue = '';
    this.activatedRoute.queryParamMap.subscribe(qParams => {
      url = qParams.get('redirectTo') ? qParams.get('redirectTo') : '/home';
      finalUrlValue = url || '/home';
      this.authSevice.logIn(this.userid.value, this.password.value).subscribe(
        (output: any) => {
          console.log(output.id);
          this.authSevice.loginState.next({
            firstName: output.firstName,
            isLoggedIn: true
          });
          localStorage.setItem('id', output.id);
          localStorage.setItem('token', output.token);
          this.router.navigate([finalUrlValue]);
        },
        error => {
          this.isValidated = false;
          console.error(error);
        }
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
