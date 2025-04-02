import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  activeNavBtn: string = "summary";

  constructor() {
    let activeNavBtnInLocalStorage = localStorage.getItem('activeNavBtn');
    if (activeNavBtnInLocalStorage) {
      this.activeNavBtn = activeNavBtnInLocalStorage;
    }
  }

  changeColor(btn: string) {
    this.activeNavBtn = btn;
    localStorage.setItem('activeNavBtn', this.activeNavBtn);
  }

}
