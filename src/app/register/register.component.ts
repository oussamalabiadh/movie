import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  msgRegsiter!: string;
  regsterForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.min(11),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}
  submitRegister(formData: FormGroup): void {
    this.loading = true;
    this._AuthService.registrationApi(formData.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this._Router.navigate(['/login']);
        } else {
          this.msgRegsiter = response.message;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
