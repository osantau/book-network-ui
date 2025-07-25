import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu implements OnInit {
  ngOnInit(): void {
    const linkColor: NodeListOf<Element> = document.querySelectorAll('.nav-link');
    linkColor.forEach(link=>{
      if(window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click',():void=>{
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
logout():void {

}

}
