import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/apis/store.service';
import { MovieCardComponent } from 'src/app/shared/movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { take } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'imalzy-favorited',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieCardComponent, MatCardModule],
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.scss'],
})
export class FavoritedComponent implements OnInit {
  constructor(public storeService: StoreService, private router:Router) {}
  ngOnInit(): void {
    this.storeService.favorite$.pipe(take(1)).subscribe((f) => {
      if (f.length === 0) {
        alert('Data masih Kosong');
        this.router.navigateByUrl('/');
      }
    });
  }
}
