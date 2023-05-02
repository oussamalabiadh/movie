import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  imgSrc:string = './assets/images/avatar.png'
  userData!: User;
  ngOnInit(): void {
    this.userData = this._AuthService.userData.getValue();
    console.log("users",this.userData);
    
  }
}
