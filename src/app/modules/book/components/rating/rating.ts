import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {
  @Input()
  rating: number = 0;
  maxRating: number = 5;

  getFullStars(): number {
    return Math.floor(this.rating);
  }
  getHalfStar(): boolean {
    return this.rating % 1!=0
  }
  getEmptyStars(): number {
    return this.maxRating -  Math.ceil(this.rating);
  }
}
