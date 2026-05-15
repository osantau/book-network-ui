import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {

  @Input()
  _book: BookResponse = {};

  @Input()
  _manage: boolean = false;

  @Input()
  _bookCover: string = '';

  @Input()
  set book(book: BookResponse) {
    this._book = book;
  }
  get book(): BookResponse {
    return this._book;
  }

  set bookCover(cover: string) {
    this._bookCover = cover;
  }

  get bookCover(): string {
    if (this._book.cover) {
      return 'data:image/jpeg;base64,' + this._book.cover;
    }
    return 'https://placehold.co/600x400?text=No+Image';

  }
  set manage(manage: boolean) {
    this._manage = manage;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.details.emit(this._book);
  }
  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }
  onBorrow() {
    this.borrow.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }
  onShare() {
    this.share.emit(this._book);
  }
  onArchive() {
    this.archive.emit(this._book);
  }


}
