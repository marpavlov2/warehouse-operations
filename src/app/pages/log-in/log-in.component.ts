import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/form-validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  private _loginFormGroup: FormGroup;

  get loginFormGroup(): FormGroup {
    return this._loginFormGroup;
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._loginFormGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          CustomFormValidator.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          CustomFormValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomFormValidator.patternValidator(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
            {
              hasSpecialCharacters: true,
            }
          ),
        ]),
      ],
    });
  }

  async login() {
    const registerForm = this.loginFormGroup.value;
    await this._authService.signIn(registerForm.email, registerForm.password);
  }
}
