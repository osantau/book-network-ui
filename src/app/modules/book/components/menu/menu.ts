import { Component } from '@angular/core';
import { BookRoutingModule } from "../../book-routing-module";

@Component({
  selector: 'app-menu',
  imports: [BookRoutingModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
logout() {
throw new Error('Method not implemented.');
}

}
