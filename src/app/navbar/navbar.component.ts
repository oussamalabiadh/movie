import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _MoviesService: MoviesService
  ) {}
  isLogin: boolean = false;
  userInfo!: Partial<User>;
  pageNumberMo!: number;
  pageNumberTv!: number;
  pageNumberPe!: number;
  pageNumberSe!: number;
  ngOnInit(): void {
    this._MoviesService.shardPageNumberMo.subscribe({
      next: () => {
        this.pageNumberMo = this._MoviesService.shardPageNumberMo.getValue();
      },
    });
    this._MoviesService.shardPageNumberTv.subscribe({
      next: () => {
        this.pageNumberTv = this._MoviesService.shardPageNumberTv.getValue();
      },
    });
    this._MoviesService.shardPageNumberPe.subscribe({
      next: () => {
        this.pageNumberPe = this._MoviesService.shardPageNumberPe.getValue();
      },
    });
    this._MoviesService.shardPageNumberSe.subscribe({
      next: () => {
        this.pageNumberSe = this._MoviesService.shardPageNumberSe.getValue();
      },
    });
    this.isUserChange();
  }
  isUserChange(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue()) {
          this.isLogin = true;
          this.userInfo = this._AuthService.userData.getValue();
          console.log(this.userInfo);
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  logOut(): void {
    this._AuthService.signOut();
  }
}
