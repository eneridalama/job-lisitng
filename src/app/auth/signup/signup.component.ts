import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { passwordRegex } from 'src/app/core/common/constants';
import { UserRole } from 'src/app/core/common/enums';
import { Utils } from 'src/app/core/utils/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signupForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private utils: Utils,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      role: new FormControl(null, [Validators.required]),
    });
  }

  signUp() {
    this.isLoading = true;
    this.authService
      .signUp(this.signupForm.value)
      .pipe(
        tap({
          next: (res) => {
            this.isLoading = false;
            res && res.displayName == UserRole.OFFER
              ? this.router.navigate(['/dashboard'])
              : this.router.navigate(['/home']);
            localStorage.setItem('user', JSON.stringify(res));
          },
          error: (err) => {
            this.isLoading = false;
            this.utils.showMessage(
              'signupToast',
              'error',
              'Error',
              err.error.error.message
            );
          },
        })
      )
      .subscribe();
    this.signupForm.reset();
  }
}
