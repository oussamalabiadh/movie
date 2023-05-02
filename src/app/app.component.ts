import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _Renderer2: Renderer2) {}
  title = 'final-movie';
  ngOnInit(): void {
    const nav = document.querySelector('nav');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.addEventListener('scroll', () => {
      if (scrollY > 200) {
        nav?.classList.add('fixed-top');
        nav!.style.cssText = `background-color : #131722 ; box-shadow:0 0 10px rgb(0 0 0 /.8)`;
      } else {
        nav?.classList.remove('fixed-top');
        nav!.style.cssText = `background-color : rgb(0 0 0 / .15)`;
      }
    });
  }
}
