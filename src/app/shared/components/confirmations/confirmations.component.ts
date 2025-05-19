import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-confirmations',
  imports: [],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.scss'
})
export class ConfirmationsComponent {

  generalService = inject(GeneralService);

}
