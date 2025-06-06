import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GeneralService } from '../../../services/general.service';

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

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  constructor() { }

  /**
   * Changes the color of the currently active navigation button by updating the 'activeNavBtn' value in GeneralService.
   * @param {string} btn - The identifier of the clicked navigation button.
   */
  changeColor(btn: string): void {
    this.generalService.activeNavBtn = btn; 
  }

}
