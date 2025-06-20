import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrl: './rating.scss'
})
export class Rating {

  @Input()
  rating: number = 0;
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }
  get halfStar(): boolean {
    return this.rating % 1 !== 0;
  }
  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }
}
