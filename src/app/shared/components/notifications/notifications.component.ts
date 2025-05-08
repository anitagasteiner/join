import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  generalService = inject(GeneralService);

}
