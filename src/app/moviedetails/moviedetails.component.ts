import { MoviesService } from './../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movieface } from '../interface/movieface';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss'],
})
export class MoviedetailsComponent implements OnInit {
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  movieId!: number;
  movieType!: string;
  moviesData:Partial<Movieface> = {}
  prefixImg:string = 'https://image.tmdb.org/t/p/original'
  ngOnInit(): void {
    this.movieId = this._ActivatedRoute.snapshot.params['id'];
    this.movieType = this._ActivatedRoute.snapshot.params['type'];
    this.getMovieId();
  }
  getMovieId():void {
    this._MoviesService.getMovieId(this.movieId,this.movieType).subscribe({
      next: (response) => {
        this.moviesData = response;
      },
    });
  }

}
