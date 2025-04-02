import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'join';

  ngOnInit() { //TODO Hier weiter!!
    if (sessionStorage.getItem('is_reloaded')) {
      console.log('Page was refreshed!');
    } else {
        console.log('First time page load.');
        sessionStorage.setItem('is_reloaded', 'true');
    }
  }

}
