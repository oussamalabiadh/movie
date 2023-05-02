import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  msgLogin!: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  subLogin(dataForm: FormGroup) {
    this.loading = true;
    this._AuthService.loginApi(dataForm.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          localStorage.setItem('MoviesToken', response.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
        } else {
          this.msgLogin = response.message;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  ngOnInit(): void {}
}
