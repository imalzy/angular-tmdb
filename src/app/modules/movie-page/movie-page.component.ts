import { NgForOf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { take } from 'rxjs';
import { MovieService, Result } from 'src/app/apis/movie.service';
import { MovieCardComponent } from 'src/app/shared/movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { TvService } from 'src/app/apis/tv.service';
import { StoreService } from 'src/app/apis/store.service';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'imalzy-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  standalone: true,
  imports: [
    MovieCardComponent,
    MatPaginatorModule,
    MovieCardComponent,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe,
    NgForOf,
    RouterModule,
  ],
})
export class MoviePageComponent implements OnInit {
  totalResults: any;
  nowPlaying: any[] = [];
  contentType = '';

  constructor(
    private movieService: MovieService,
    private tvService: TvService,
    private router: Router,
    private storeService: StoreService
  ) {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit(): void {
    if (this.contentType === 'movies') {
      this.getNowPlayinMovies(1);
    } else {
      this.getNowPlayinTVShows(1);
    }
  }

  getNowPlayinMovies(page: number) {
    this.movieService
      .getNowPlaying(page)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.totalResults = res.total_results;
          this.nowPlaying = [...res.results];
          console.log(this.nowPlaying);
        },
        () => {
          console.log('complete');
        }
      );
  }

  getNowPlayinTVShows(page: number) {
    this.tvService
      .getTvOnTheAir(page)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.totalResults = res.total_results;
          this.nowPlaying = res.results;
        },
        () => {
          console.log('complete');
        }
      );
  }

  changePage(event: any) {
    this.getNowPlayinMovies(event.pageIndex + 1);
  }

  onFavorited(item: Result): void {
    const movie = {
      ...item,
      favorited: true,
    };

    const tempFilm = this.nowPlaying.map((p) =>
      p.id === item.id ? { ...p, favorited: !p.favorited } : p
    );

    this.nowPlaying = tempFilm;
    this.storeService.addToFavorite(item);
  }
}
