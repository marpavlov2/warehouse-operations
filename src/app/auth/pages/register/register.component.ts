import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/form-validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private _registerFormGroup: FormGroup;

  get registerFormGroup(): FormGroup {
    return this._registerFormGroup;
  }

  get email() {
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  // Name and city are optional, this form could also contain repeat password field
  ngOnInit(): void {
    this._registerFormGroup = this._formBuilder.group({
      name: [''],
      city: [''],
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

  async register() {
    const registerForm = this.registerFormGroup.value;
    await this._authService.signUp(
      registerForm.name,
      registerForm.city,
      registerForm.email,
      registerForm.password
    );
  }
}
