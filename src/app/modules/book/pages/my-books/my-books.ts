import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookCard } from "../../components/book-card/book-card";
import { Pagination } from "../../components/pagination/pagination";
import { BookResponse } from '../../../../services/models';
import { FindAllBooks$Params, findAllBooksByOwner } from '../../../../services/functions';
import { borrwedBook, BorrwedBook$Params } from '../../../../services/functions';

@Component({
  selector: 'app-my-books',
  imports: [BookCard, Pagination],
  templateUrl: './my-books.html',
  styleUrl: './my-books.scss',
})
export class MyBooks {
editBook($event: BookResponse) {
throw new Error('Method not implemented.');
}
shareBook($event: BookResponse) {
throw new Error('Method not implemented.');
}
archiveBook($event: BookResponse) {
throw new Error('Method not implemented.');
}
  onPageChange(newPage: number) {

    this.page = newPage;
    this.findAllBooks();
  }
  bookResponse: PageResponseBookResponse = {};
  page: number = 1;
  size: number = 2;

  constructor(private router: Router, private config: ApiConfiguration, private http: HttpClient,) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    const params: FindAllBooks$Params = {
      page: this.page - 1,
      size: this.size
    };

    findAllBooksByOwner(this.http, this.config.rootUrl, params).subscribe({
      next: (books) => {
        this.bookResponse = books.body;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
