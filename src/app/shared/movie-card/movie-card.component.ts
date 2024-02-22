import { JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { Router, RouterModule } from '@angular/router';
import { MovieService, Result } from 'src/app/apis/movie.service';
import { StoreService } from 'src/app/apis/store.service';

@Component({
  selector: 'imalzy-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatPaginatorModule,
    NgForOf,
    NgStyle,
    NgIf,
    NgClass,
    JsonPipe,
    TruncatePipe,
    RouterModule,
  ],
})
export class MovieCardComponent implements OnInit {
  imgUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
  @Input({ required: true }) data: any;
  @Output() favorited: EventEmitter<Result> = new EventEmitter<Result>();

  contentType!: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.contentType = this.router.url.split('/')[1];
  }

  detailFilm(id: string) {
    if (this.contentType === 'movies') {
      this.router.navigate(['movies', id]);
    } else {
      this.router.navigate(['tv-shows', id]);
    }
  }

  addToFavorite(item: Result) {
    this.favorited.emit(item);
  }
}
