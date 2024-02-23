import {
  Component,
  DestroyRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, of, take } from 'rxjs';
import { ImgMissingDirective } from 'src/app/shared/directives/img-missing.directive';
import { MovieCardComponent } from 'src/app/shared/movie-card/movie-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MovieService } from 'src/app/apis/movie.service';
import { TvService } from 'src/app/apis/tv.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface IMovieModel {
  adult: boolean;
  backdrop_path: string;
  genres: Array<any>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<any>;
  production_countries: Array<any>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<any>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITvModel {
  original_name: string;
  genre_ids: Array<number>;
  name: string;
  tagline: string;
  popularity: number;
  origin_country: Array<string>;
  vote_count: number;
  first_air_date: Date;
  backdrop_path: string;
  original_language: string;
  id: number;
  vote_average: number;
  overview: string;
  poster_path: string;
  created_by: Array<any>;
  genres: Array<any>;
  homepage: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Array<any>;
}

interface IPaginationModel {
  dates?: any;
  page: number;
  results: Array<IMovieModel | ITvModel>;
  total_pages: number;
  total_results: number;
}
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genres: Array<any>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<any>;
  production_countries: Array<any>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<any>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ITV {
  original_name: string;
  genre_ids: Array<number>;
  name: string;
  tagline: string;
  popularity: number;
  origin_country: Array<string>;
  vote_count: number;
  first_air_date: Date;
  backdrop_path: string;
  original_language: string;
  id: number;
  vote_average: number;
  overview: string;
  poster_path: string;
  created_by: Array<any>;
  genres: Array<any>;
  homepage: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Array<any>;
}

export interface IContent {
  id: number;
  results: Array<any>;
  name: string;
  url: any;
  key: string;
}

@Component({
  selector: 'imalzy-detail-film',
  standalone: true,
  imports: [
    MatButtonModule,
    NgForOf,
    NgIf,
    DatePipe,
    MatProgressBarModule,
    CdkDrag,
    MatDialogModule,
    CdkDragHandle,
    MovieCardComponent,
    MatIconModule,
    ImgMissingDirective,
  ],
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.scss'],
})
export class DetailFilmComponent implements OnInit {
  contentType = '';
  content!: any;
  recomendedContentList: IPaginationModel[] = [];
  video!: IContent;
  isLoading = true;

  @ViewChild('matTrailerDialog') matTrailerDialog!: TemplateRef<any>;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private moviesService: MovieService,
    private tvShowsService: TvService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public trailerDialog: MatDialog
  ) {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.isLoading = true;

      if (this.contentType === 'movies') {
        this.initMovie(id);
      } else {
        this.initTvShow(id);
      }
    });
  }

  initMovie(id: string): void {
    forkJoin([
      this.moviesService.getMovie(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
      this.moviesService.getMovieVideos(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
      this.moviesService.getRecomendMovies(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        ([movie, video, recomended]) => {
          this.content = movie;
          this.isLoading = false;
          this.recomendedContentList = recomended.results.slice(0, 12);
          if (video?.results?.length > 0) {
            const trailerList = video.results.filter(
              (video: any) => video.type === 'Trailer'
            );
            this.video = trailerList[0];
            this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + this.video['key']
            );
          } else {
            this.video = {
              id: 0,
              results: [],
              name: '',
              url: '',
              key: '',
            };
          }
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  initTvShow(id: string): void {
    forkJoin([
      this.tvShowsService.getTVShow(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
      this.tvShowsService.getTVShowVideos(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
      this.tvShowsService.getRecomendTVShows(id).pipe(
        catchError(() => {
          return of({});
        })
      ),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        ([tvShow, resVideo, recomended]) => {
          this.content = tvShow;
          this.recomendedContentList = recomended.results.slice(0, 12);
          if (resVideo?.results?.length > 0) {
            this.video = resVideo.results.filter(
              (video: any) => video.type === 'Trailer'
            )[0];
            this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + this.video['key']
            );
          } else {
            this.video = {
              id: 0,
              results: [],
              name: '',
              url: '',
              key: '',
            };
          }
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.trailerDialog.open(this.matTrailerDialog, {});
    dialogRef.disableClose = false;
  }
}
