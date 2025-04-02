import { Component, inject } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  generalService = inject(GeneralService);

  constructor() {
    this.generalService.activeNavBtn = 'summary';
  }

}
