import { Component, OnInit } from '@angular/core';
import { findAllBooks, FindAllBooks$Params } from '../../../../services/functions';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { HttpClient } from '@angular/common/http';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookCard } from "../../components/book-card/book-card";

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {
  bookResponse: PageResponseBookResponse={};
  private page: number = 0;
  private size: number = 10;


  constructor(private router: Router,private config: ApiConfiguration,private http: HttpClient,) { }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    const params: FindAllBooks$Params = {
      page: this.page,
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
}
