import { Component, inject } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../general.service';
import { DataBaseService } from '../../data-base.service';
import { Observable } from 'rxjs';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { Contact } from './../../models/contact.model';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactComponent,
    AddEditContactComponent,
    ContactDetailsComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  contacts$: Observable<Contact[]>; // contacts$ ist ein Observable mit der Liste aller Kontakte

  displayedContact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

  generalService = inject(GeneralService);

  contactDetailsOpened: boolean = false;

  constructor(private dataBaseService: DataBaseService) {
    this.contacts$ = this.dataBaseService.getData('contacts');
    this.generalService.activeNavBtn = 'contacts';
  }

  showContactDetails(contact: Contact) {
    this.displayedContact = contact;
    this.generalService.setSelectedContact(contact);
    this.contactDetailsOpened = true;
  }

  showAddContactForm() {
    this.generalService.addContactFormOpened = true;
  }

}
