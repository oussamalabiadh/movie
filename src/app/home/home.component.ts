import { Movieface } from './../interface/movieface';
import { MoviesService } from './../services/movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private _MoviesService: MoviesService) {}
  trendingMovies!: Partial<Movieface>[];
  moviesSubscrip: Subscription = new Subscription();
  trendingTv!: Partial<Movieface>[];
  tvSubscrip: Subscription = new Subscription();
  trendingPerson!: Partial<Movieface>[];
  personSubscrip: Subscription = new Subscription();
  prefixImg: string = 'https://image.tmdb.org/t/p/original';
  isLoding: boolean = true;
  // To Sprid All data to array
  allData: Partial<Movieface>[] = [];
  // Owl Carsole
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 4,
      },
      740: {
        items: 6,
      },
      940: {
        items: 10,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    setTimeout(() => {
      this.getTrendingMovies();
    }, 500);
  }
  // get trending movies
  getTrendingMovies() {
    this.moviesSubscrip = this._MoviesService.getTrending('movie').subscribe({
      next: (response) => {
        this.trendingMovies = response.results.slice(0, 10);
      },
      complete: () => {
        this.isLoding = false;
        this.getTrendingTv();
      },
    });
  }
  // get trending tv
  getTrendingTv() {
    return (this.tvSubscrip = this._MoviesService.getTrending('tv').subscribe({
      next: (response) => {
        this.trendingTv = response.results.slice(0, 10);
      },
      complete: () => {
        this.allData = [...this.trendingMovies, ...this.trendingTv];
        this.getTrendingPerson();
      },
    }));
  }
  // get trending person
  getTrendingPerson() {
    return (this.personSubscrip = this._MoviesService
      .getTrending('person')
      .subscribe({
        next: (response) => {
          this.trendingPerson = response.results.slice(0, 10);
        },
      }));
  }
  // when go out component
  ngOnDestroy(): void {
    this.moviesSubscrip.unsubscribe();
    this.tvSubscrip.unsubscribe();
    this.personSubscrip.unsubscribe();
  }
}
