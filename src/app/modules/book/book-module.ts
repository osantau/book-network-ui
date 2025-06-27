import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing-module';
import { Menu } from './components/menu/menu';
import { MyBooks } from './pages/my-books/my-books';
import { ManageBook } from './pages/manage-book/manage-book';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,   
    BookRoutingModule,   
    MyBooks,  ManageBook   
  ]
})
export class BookModule { }
