import { Component } from '@angular/core';
import { BookRoutingModule } from "../../book-routing-module";
import { Menu } from '../../components/menu/menu';

@Component({
  selector: 'app-main',
  imports: [BookRoutingModule, Menu],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
