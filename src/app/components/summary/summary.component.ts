import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  // generalService = inject(GeneralService);

  constructor(private generalService: GeneralService) {
    this.generalService.activeNavBtn = 'summary';
  }

  chooseGreeting() {
    let d = new Date();
    let h = d.getHours();
    if (h >= 4 && h < 10) {
        return 'Good morning';
    } else if ((h < 4) || (h >= 10 && h < 13)) {
        return  'Hello';
    } else if (h >= 13 && h < 17) {
        return 'Good afternoon';
    } else if (h >= 17) {
        return 'Good evening';
    } else {
      return 'Hello';
    }
  }

}
