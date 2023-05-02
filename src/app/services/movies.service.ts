import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _HttpClient: HttpClient) {}
   // shared to send pageNumber To routerLink in nav
  shardPageNumberMo: BehaviorSubject<any> = new BehaviorSubject(1);
  shardPageNumberTv: BehaviorSubject<any> = new BehaviorSubject(1);
  shardPageNumberPe: BehaviorSubject<any> = new BehaviorSubject(1);
  shardPageNumberSe: BehaviorSubject<any> = new BehaviorSubject(1);
  // get all trending for home page
  getTrending(mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=48d62e7452a1f1a5e6018217ac27c50a`
    );
  }
  // get movies and tv and person by id for details page
  getMovieId(id: number, type: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US`
    );
  }
  // get movies and tv by page number 
  getMovieByPagination(mediaType: string, pagNumber: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&page=${pagNumber}`
    );
  }
  // get people by page number
  getPeople(pageNumber: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&page=${pageNumber}`
    );
  }
  // get Movies By Key Word
  getMoviesByWord (pageNumber:number,word:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&query=${word}&page=${pageNumber}`)
  }
}
