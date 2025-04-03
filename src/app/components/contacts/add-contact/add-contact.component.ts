import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../general.service';

@Component({
  selector: 'app-add-contact',
  imports: [],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  generalService = inject(GeneralService);

  hideAddContactForm() {
    this.generalService.addContactFormOpened = false;
  }

}
