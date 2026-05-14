import { Component, OnInit } from '@angular/core';
import { BookRoutingModule } from "../../book-routing-module";

@Component({
  selector: 'app-menu',
  imports: [BookRoutingModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(l => {
      if (window.location.href.endsWith(l.getAttribute("href") || '')) {
        l.classList.add('active');
      }

      l.addEventListener('click', () => {
        linkColor.forEach(ln => ln.classList.remove('active'));
        l.classList.add('active');
      });
    }
    );

  }

  logout() {
    throw new Error('Method not implemented.');
  }

}
