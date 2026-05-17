import { Component, OnInit } from '@angular/core';
import { findAllBooks, FindAllBooks$Params } from '../../../../services/functions';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookCard } from "../../components/book-card/book-card";
import { Pagination } from "../../components/pagination/pagination";
import { BookResponse } from '../../../../services/models';
import { borrwedBook, BorrwedBook$Params } from '../../../../services/functions';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, Pagination],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {

  onPageChange(newPage: number) {

    this.page = newPage;
    this.findAllBooks();
  }
  bookResponse: PageResponseBookResponse = {};
  page: number = 1;
  size: number = 10;
  message: string = '';
  level: string = 'success';

  constructor(private router: Router, private config: ApiConfiguration, private http: HttpClient,) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    const params: FindAllBooks$Params = {
      page: this.page - 1,
      size: this.size
    };

    findAllBooks(this.http, this.config.rootUrl, params).subscribe({
      next: (books) => {
        this.bookResponse = books.body;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  borrowBook(book: BookResponse) {
    this.message = '';
    const params: BorrwedBook$Params = {
      'book-id': book.id as number
    }

    borrwedBook(this.http, this.config.rootUrl, params).subscribe({

      next: () => {
        this.level = 'success';
       this.message = 'Book successfully added to your list!';
      },
      error: (err) => {
        this.level = 'danger';
        this.message = err.error.error;
      }
    });
  }
}
