import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./modules/movie-page/movie-page.component').then(
        (m) => m.MoviePageComponent
      ),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./modules/detail-film/detail-film.component').then(
        (m) => m.DetailFilmComponent
      ),
  },
  {
    path: 'tv-shows',
    loadComponent: () =>
      import('./modules/movie-page/movie-page.component').then(
        (m) => m.MoviePageComponent
      ),
  },
  {
    path: 'tv-shows/:id',
    loadComponent: () =>
      import('./modules/detail-film/detail-film.component').then(
        (m) => m.DetailFilmComponent
      ),
  },
  {
    path: 'favorited',
    loadComponent: () =>
      import('./modules/favorited/favorited.component').then(
        (m) => m.FavoritedComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
