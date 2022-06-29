import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/form-validator';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._registerFormGroup = this._formBuilder.group({
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
}
