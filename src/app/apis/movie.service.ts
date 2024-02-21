import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = environment.apiKey;
    this.language = 'id-ID';
    this.region = 'ID';
  }

  getMovies(type: string, page: number): Observable<MovieResponseAPI> {
    const options = {
      params: new HttpParams()
        .set('api_key', this.apiKey)
        .set('page', page)
        .set('language', this.language)
        .set('region', this.region),
    };
    return this.httpClient.get<MovieResponseAPI>(`${this.baseUrl}movie/${type}`, options);
  }
}

export interface MovieResponseAPI {
  dates?: Dates;
  page?: number;
  results?: Result[];
  total_pages?: number;
  total_results?: number;
}

export interface Dates {
  maximum?: Date;
  minimum?: Date;
}

export interface Result {
  adult?: boolean;
  backdrop_path?: null | string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
