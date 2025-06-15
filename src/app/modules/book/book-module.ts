import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing-module';
import { Menu } from './components/menu/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
    BookRoutingModule,        
  ]
})
export class BookModule { }
