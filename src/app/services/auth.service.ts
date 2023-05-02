import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.saveUserData();
  }
  baseUrl:string =`https://route-ecommerce.onrender.com/api/v1/auth/`
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  registrationApi(data: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}signup`,
      data
    );
  }
  loginApi(data: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}signin`,
      data
    );
  }
  saveUserData() {
    const encodeToken: string | null = localStorage.getItem('MoviesToken');
    if (encodeToken) {
      const decodeToken: object = jwtDecode(encodeToken);
      this.userData.next(decodeToken);
    }
  }
  signOut(): void {
    localStorage.removeItem('MoviesToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
