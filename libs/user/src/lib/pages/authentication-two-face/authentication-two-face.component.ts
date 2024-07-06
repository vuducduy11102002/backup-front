import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'hospital-authentication-two-face',
  templateUrl: './authentication-two-face.component.html',
  styleUrls: ['./authentication-two-face.component.scss'],
})
export class AuthenticationTwoFaceComponent implements OnInit {
  authenticationFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private localstorageService: LocalstorageService
  ) {}

  private _initLoginForm(): void {
    this.authenticationFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._initLoginForm();

    // Lấy giá trị email từ Service
    const email = this.auth.getEmail();

    // Sử dụng giá trị email để cập nhật form
    this.authenticationFormGroup.patchValue({
      email: email,
    });
  }

  get loginForm() {
    return this.authenticationFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.authenticationFormGroup.invalid) return;

    const logindata = {
      email: this.loginForm['email'].value,
      otp:
        this.authenticationFormGroup.controls['otp1'].value +
        this.authenticationFormGroup.controls['otp2'].value +
        this.authenticationFormGroup.controls['otp3'].value +
        this.authenticationFormGroup.controls['otp4'].value +
        this.authenticationFormGroup.controls['otp5'].value +
        this.authenticationFormGroup.controls['otp6'].value,
    };

    this.auth.authentication(logindata.email, logindata.otp).subscribe(
      (user) => {
        // Assuming user object has properties 'token' and 'role'
        this.localstorageService.setTokenAndRole({
          token: user.token,
          role: user.role,
        });

        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onKeyUp(event: Event, nextControlName: string) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Loại bỏ các ký tự không phải số
    const sanitizedValue = inputValue.replace(/\D/g, '');

    // Giới hạn độ dài tối đa là 1 ký tự
    const truncatedValue = sanitizedValue.slice(0, 1);

    // Cập nhật giá trị của input
    inputElement.value = truncatedValue;

    // Cập nhật giá trị trong FormGroup
    this.authenticationFormGroup.controls[nextControlName].setValue('');

    // Nếu có giá trị, thì tập trung vào ô tiếp theo
    if (truncatedValue) {
      const nextInput = document.querySelector(
        `[formControlName="${nextControlName}"]`
      ) as HTMLInputElement;
      nextInput.focus();
    }
  }
}
