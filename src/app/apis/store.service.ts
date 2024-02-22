import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private favorite = new BehaviorSubject<Result[]>([]);
  public favorite$ = this.favorite.asObservable();

  private getFavorite(): Result[] {
    return this.favorite.getValue();
  }

  addToFavorite(favorite: Result) {
    const data = this.getFavorite();

    this.favorite.next([...data, favorite]);
  }

  removeFromFavorite(id: number) {
    const data = this.getFavorite();
    this.favorite.next(data.filter((item) => item.id !== id));
  }
}
