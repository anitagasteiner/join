import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../general.service';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  generalService = inject(GeneralService);

  showEditContactForm() {
    this.generalService.editContactFormOpened = true;
  }

}
