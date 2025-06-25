import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCard } from '../../components/book-card/book-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {

  goToLastPage() {
    this.page=this.bookResponse.totalPages as number - 1 ;
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

  constructor(private bookService: BookService, private router: Router) { }
  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
        this.pages = Array(this.bookResponse.totalPages).fill(0).map((x,i)=>i);
      }
    });
  }
}
