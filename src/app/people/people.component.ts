import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movieface } from '../interface/movieface';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  trendingPerson!: Partial<Movieface>[];
  moviesSubscrip: Subscription = new Subscription();
  prefixImg: string = 'https://image.tmdb.org/t/p/original';
  PagNumArray!: number[]; // to create pagination number by array
  totalPages!: number; // response.total_pages;
  curentPaginationClick: number = 1;
  isLoding: boolean = true;
  isLoding2: boolean = true;
  firstRun: boolean = true;
  ngOnInit(): void {
    this.getMovies(this.activatePageNum());
  }
  ngOnDestroy(): void {
    this.moviesSubscrip.unsubscribe();
  }
  activatePageNum(): any {
    // get ativate route params
    return parseInt(this._ActivatedRoute.snapshot.params['page']) <= 0
      ? (this._Router.navigate(['/people/1']), 1)
      : parseInt(this._ActivatedRoute.snapshot.params['page']);
  }
  getMovies(number: number): void {
    this.isLoding2 = true;
    setTimeout(() => {
      this.moviesSubscrip = this._MoviesService.getPeople(number).subscribe({
        next: (response) => {
          this.trendingPerson = response.results;
          this.totalPages = response.total_pages;
          if (this.totalPages >= 11 && this.totalPages >= number) {
            console.log('true1', number, this.totalPages);

            if (number >= this.totalPages) {
              console.log('true');

              this.PagNumArray = new Array(6)
                .fill(number > 5 ? number - 5 : (number = 1))
                .map((a, b) => {
                  if (a + b > this.totalPages) {
                    return a - b;
                  } else {
                    return a + b;
                  }
                });
            } else {
              this.PagNumArray = new Array(11)
                .fill(number > 5 ? number - 5 : (number = 1))
                .map((a, b) => {
                  return a + b;
                });
            }
          } else if (this.totalPages < 11 && this.totalPages > number) {
            this.PagNumArray = new Array(this.totalPages)
              .fill(number > 5 ? number - 5 : number)
              .map((a, b) => a + b);
          }
        },
        complete: () => {
          this._MoviesService.shardPageNumberPe.next(this.activatePageNum()); // send activate number to shard movie service
          if (this.firstRun) {
            this.firstRun = false;
            this.isLoding = false;
          }
          this.isLoding2 = false;
        },
        error: (error) => {
          alert(`Page Not Found : ${error.error.errors[0]}`);
          this._Router.navigate(['/people/1']).finally(() => {
            this.getMovies(this.activatePageNum());
          });
        },
      });
    }, 500);
  }
  changePageUrl(e: any): void {
    this.curentPaginationClick = parseInt(e); // Get Number When Click in pagination inner Httml
    // to unsubscript
    this.getMovies(this.curentPaginationClick);
  }
  // to prev page
  pervPage(): void {
    if (this.activatePageNum() > 1) {
      let curentActivate: number = this.activatePageNum();
      this._Router
        .navigate([`/people/${(curentActivate -= 1)}`])
        .finally(() => {
          this.getMovies(this.activatePageNum());
        });
    }
  }
  // to next page
  nextPage(): void {
    if (this.totalPages > this.activatePageNum()) {
      let curentActivate: number = this.activatePageNum();
      this._Router
        .navigate([`/people/${(curentActivate += 1)}`])
        .finally(() => {
          this.getMovies(this.activatePageNum());
        });
    }
  }
}
