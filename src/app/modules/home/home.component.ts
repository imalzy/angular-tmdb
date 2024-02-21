import {
  DatePipe,
  JsonPipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgTemplateOutlet,
  SlicePipe,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import {
  MovieService,
  Result,
} from 'src/app/apis/movie.service';
import { TvService } from 'src/app/apis/tv.service';
import { ImgMissingDirective } from 'src/app/shared/directives/img-missing.directive';
import { MovieCardComponent } from 'src/app/shared/movie-card/movie-card.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';

@Component({
  selector: 'imalzy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MovieCardComponent,
    RouterLink,
    NgForOf,
    NgIf,
    SlicePipe,
    JsonPipe,
    DatePipe,
    NgOptimizedImage,
    NgTemplateOutlet,
    ImgMissingDirective,
    TruncatePipe
  ],
  standalone: true,
})
export class HomeComponent implements OnInit {
  moviesList: Result[] = [];
  tvList:any;
  constructor(private moviesService: MovieService, private tvService: TvService) {
    console.log('constructor');
  }

  ngOnInit(): void {
    this.getMovies('now_playing', 1);
    this.getTVShows('airing_today', 1);
  }

  getMovies(type: string, page: number): void {
    this.moviesService
      .getMovies(type, page)
      .pipe(take(1))
      .subscribe((res) => {
        this.moviesList = res.results as Result[];
        console.log('********movie list', this.moviesList);
      });
  }

  getTVShows(type: string, page: number): void {
    this.tvService.getTVShows(type, page).subscribe(res => {
      this.tvList = res.results;
      console.log(this.tvList)
    });
  }
}
