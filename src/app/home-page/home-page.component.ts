import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MyValidators} from "../my.validators";
import {IUser} from "../shared/models/autorization.module";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public form: FormGroup;
  private emailPattern: RegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  passwordStrength: string[] = ['gray', 'gray', 'gray'];
  showPassword: boolean = false;
  passwordStrengthText: string = '';

  constructor(
    private router: Router
  ) {
    this.form = this.getBlankForm();
  }

  getBlankForm(): FormGroup {
    return new FormGroup<any>({
      email: new FormControl<string>('', [
        Validators.pattern(this.emailPattern),
        Validators.required,
        MyValidators.restrictedEmail
      ]),
      password: new FormControl<string>('', [
        Validators.minLength(8),
        Validators.maxLength(25)
      ])
    })
  }

  checkPasswordStrength() {
    const password = this.form.get('password')?.value;

    if (!password) {
      this.passwordStrength = ['gray', 'gray', 'gray'];
    } else if (password.length < 8) {
      this.passwordStrength = ['red', 'red', 'red'];
    } else {
      const hasLetters = /[a-zA-Zа-яА-Я]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (hasLetters && hasNumbers && hasSymbols) {
        this.passwordStrength = ['green', 'green', 'green'];
        this.passwordStrengthText = 'Strong password (contains letters, numbers, and special characters)';
      } else if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
        this.passwordStrength = ['yellow', 'yellow', 'gray'];
        this.passwordStrengthText = 'Medium-strength password (contains two types of characters)';
      } else {
        this.passwordStrength = ['red', 'gray', 'gray'];
        this.passwordStrengthText = 'Weak password (contains only one type of character)';
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    } else {
      this.router.navigate(['/authorized']);
    }
  }

  extractDomain(email: string | null): string {
    if (email) {
      const atIndex: number = email.indexOf('@');
      if (atIndex >= 0) {
        return email.substring(atIndex + 1);
      }
    }
    return '';
  }

  get passwordLength(): number {
    const passwordControl = this.form.get('password');
    if (passwordControl && passwordControl.value) {
      return passwordControl.value.length;
    }
    return 0;
  }
}
