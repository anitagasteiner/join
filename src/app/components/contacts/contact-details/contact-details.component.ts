import { Component, inject, Input } from '@angular/core';
// import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { Observable } from 'rxjs';
import { Contact } from './../../../models/contact.model';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-contact-details',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  // @Input()displayedContact!: Contact;

  // generalService = inject(GeneralService);
  contactsService = inject(ContactsService);

  displayedContact$: Observable<Contact> = this.contactsService.selectedContact$; // displayedContact$ wird als Observable<Contact> deklariert und sofort auf den Wert des selectedContact$-Streams aus dem ContactsService gesetzt

  constructor() {
    // this.displayedContact$ = this.generalService.selectedContact$;
  }

}
