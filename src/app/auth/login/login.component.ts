import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { passwordRegex } from 'src/app/core/common/constants';
import { tap } from 'rxjs';
import { UserRole } from 'src/app/core/common/enums';
import { Utils } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: Utils
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  logIn(): void {
    this.authService
      .logIn(this.loginForm.value)
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
              'loginToast',
              'error',
              'Error',
              err.error.error.message
            );
          },
        })
      )
      .subscribe();
    this.loginForm.reset();
  }
}
