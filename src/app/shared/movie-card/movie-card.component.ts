import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'imalzy-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    NgOptimizedImage,
  ]
})
export class MovieCardComponent {
  @Input({required: true}) data: any; 
}
