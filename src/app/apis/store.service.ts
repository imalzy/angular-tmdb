import { Injectable } from '@angular/core';
import { BehaviorSubject, find } from 'rxjs';
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
    const findData = data.findIndex(({ id }) => id === favorite.id);
    console.log('find', findData);
    if (findData === -1) {
      this.favorite.next([...data, favorite]);
    } else {
      data.splice(findData, 1);
      this.favorite.next([...data]);
    }
  }

  removeFromFavorite(id: number) {
    const data = this.getFavorite();
    this.favorite.next(data.filter((item) => item.id !== id));
  }
}
