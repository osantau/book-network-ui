import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Rating } from "../rating/rating";

@Component({
  selector: 'app-book-card',
  imports: [Rating],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {

  private _book: BookResponse = {};
  private _manage: boolean = false;
  imageSrc: SafeUrl | undefined;

  constructor(private sanitize: DomSanitizer) {

  }

  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;

    if (value.bookCover) {
      this.imageSrc = this.sanitize.bypassSecurityTrustUrl(`data:image/png;base64,${this._book.imgBase64}`);
    }
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onArchive(): void {
    this.archive.emit(this._book);
  }
  onShare(): void {
    this.share.emit(this._book);
  }
  onEdit(): void {
    this.edit.emit(this._book);
  }
  onAddToWaitingList(): void {
    this.addToWaitingList.emit(this._book);
  }
  onBorrow(): void {
    this.borrow.emit(this._book);
  }
  onShowDetails(): void {
    this.details.emit(this._book);
  }
}
