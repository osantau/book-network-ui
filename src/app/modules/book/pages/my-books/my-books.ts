import { Component } from '@angular/core';
import { BookResponse } from '../../../../services/models/book-response';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookService } from '../../../../services/services/book.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BookCard } from '../../components/book-card/book-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-books',
  imports: [BookCard, CommonModule,RouterLink, RouterOutlet],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss'
})
export class MyBooks {
  constructor(private bookService: BookService, private router: Router) { }
  ngOnInit(): void {
    this.findAllBooks();
  }
  editBook(book: BookResponse) {
    throw new Error('Method not implemented.');
  }
  shareBook(book: BookResponse) {
    throw new Error('Method not implemented.');
  }
  archiveBook(book: BookResponse) {
    throw new Error('Method not implemented.');
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }
  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }
  page = 0;
  size = 5;
  pages: any = [];
  bookResponse: PageResponseBookResponse = {};



  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
        this.pages = Array(this.bookResponse.totalPages).fill(0).map((x, i) => i);
      }
    });
  }
}
