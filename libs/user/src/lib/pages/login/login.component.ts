import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hospital-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('container')
  container!: ElementRef;
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password are wrong';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }

  private _initLoginForm(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;

    const logindata = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value,
    };

    this.auth.login(logindata.email, logindata.password).subscribe(
      (user) => {
        this.authError = false;
        console.log(user);

        // Assuming user object has properties 'token' and 'role'
        // this.localstorageService.setTokenAndRole({
        //   token: user.token,
        //   role: user.role,
        // });
        this.auth.setEmail(logindata.email);

        // Navigate to your desired route
        this.router.navigate(['/authentication']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 500) {
          this.authMessage = 'Error in the Server, please try again later';
        }
      }
    );
  }
}
