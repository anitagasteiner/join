import { Component, inject } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { DataBaseService } from '../../services/data-base.service';
import { map, Observable } from 'rxjs';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { Contact } from './../../models/contact.model';
import { ContactsService } from '../../services/contacts.service';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactComponent,
    AddEditContactComponent,
    ContactDetailsComponent,
    NotificationsComponent
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
  contactsService = inject(ContactsService);

  // contactDetailsOpened: boolean = false;

  constructor(private dataBaseService: DataBaseService) {
    const originalContacts$ = this.dataBaseService.getData<Contact>('contacts'); // Ich habe hier <Contact> angegeben, weil ich in der Funktion getData eine Typisierung verlange.
    this.contacts$ = originalContacts$.pipe(map(contacts => contacts.sort((a, b) => a.name.localeCompare(b.name))));
    this.generalService.activeNavBtn = 'contacts';
  }

  showContactDetails(contact: Contact) {
    this.displayedContact = contact;
    this.contactsService.setSelectedContact(contact);
    this.contactsService.contactDetailsOpened = true;
  }

  showAddContactForm() {
    this.contactsService.addContactFormOpened = true;
  }

}
