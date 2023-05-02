import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movieface } from '../interface/movieface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  searchMovies!: Partial<Movieface>[];
  moviesSubscrip: Subscription = new Subscription();
  prefixImg: string = 'https://image.tmdb.org/t/p/original';
  PagNumArray!: number[]; // to create pagination number by array
  totalPages!: number; // response.total_pages;
  termSearch: string = '';
  curentPaginationClick: number = 1;
  isLoding: boolean = true;
  isloading2: boolean = false;
  firstRun: boolean = true;
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.moviesSubscrip.unsubscribe();
  }
  activatePageNum(): any {
    // get ativate route params
    return parseInt(this._ActivatedRoute.snapshot.params['page']) <= 0
      ? (this._Router.navigate(['/search/1']), 1)
      : parseInt(this._ActivatedRoute.snapshot.params['page']);
  }
  getMovies(number: number, keyword: string): void {
    if (this.termSearch.length > 0) {
      this.isLoding = false;
      setTimeout(() => {
        this.moviesSubscrip = this._MoviesService
          .getMoviesByWord(number, keyword)
          .subscribe({
            next: (response) => {
              this.searchMovies = response.results;
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
              this._MoviesService.shardPageNumberSe.next(
                this.activatePageNum()
              ); // send activate number to shard movie service
              this.isLoding = true;
              this.isloading2 = true;
            },
            error: (error) => {
              alert(`Page Not Found : ${error.error.errors[0]}`);
              console.log(error);

              this._Router.navigate(['/search/1']).finally(() => {
                if (this.termSearch.length > 1) {
                  this.getMovies(this.activatePageNum(), this.termSearch);
                }
              });
            },
          });
      }, 500);
    }
  }
  changePageUrl(e: any): void {
    this.curentPaginationClick = parseInt(e); // Get Number When Click in pagination inner Httml
    // to unsubscript
    this.getMovies(this.curentPaginationClick, this.termSearch);
  }
  // to prev page
  pervPage(): void {
    if (this.activatePageNum() > 1) {
      let curentActivate: number = this.activatePageNum();
      this._Router
        .navigate([`/search/${(curentActivate -= 1)}`])
        .finally(() => {
          this.getMovies(this.activatePageNum(), this.termSearch);
        });
    }
  }
  // to next page
  nextPage(): void {
    if (this.totalPages > this.activatePageNum()) {
      let curentActivate: number = this.activatePageNum();
      this._Router
        .navigate([`/search/${(curentActivate += 1)}`])
        .finally(() => {
          this.getMovies(this.activatePageNum(), this.termSearch);
        });
    }
  }
}
