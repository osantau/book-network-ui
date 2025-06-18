import { Component, Input } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {
  private _book: BookResponse = {};  
  imageSrc: SafeUrl | undefined;
  
  constructor(private sanitize:DomSanitizer)
  {

  }

  get book(): BookResponse {
    console.log(this._book)
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {    
    this._book = value;
    
    if(value.bookCover)
       {
this.imageSrc=this.sanitize.bypassSecurityTrustUrl(`data:image/png;base64,${this._book.imgBase64}`);
       }
  }
}
