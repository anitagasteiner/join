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
import { ConfirmationsComponent } from '../../shared/components/confirmations/confirmations.component';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactComponent,
    AddEditContactComponent,
    ContactDetailsComponent,
    NotificationsComponent,
    ConfirmationsComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * Instance of ContactsService used to manage contact data and operations.
   * 
   * @type {ContactsService}
   */
  contactsService: ContactsService = inject(ContactsService);

  /**
   * Observable stream of all contacts.
   * 
   * @type {Observable<Contact[]>}
   */
  unsortedContacts$: Observable<Contact[]>;

  /**
   * Observable stream of all contacts, sorted alphabetically by name.
   * 
   * @type {Observable<Contact[]>}
   */
  contacts$: Observable<Contact[]>;

  /**
   * Creates an instance of ContactsComponent.
   * Initializes the contacts stream and sorts the contacts.
   * Sets the currently active navigation button in the general service to 'contacts'. This is used to highlight the navigation button that corresponds to the currently opened section.
   * 
   * @param {DataBaseService} dataBaseService - Service to access the backend database.
   */
  constructor(private dataBaseService: DataBaseService) {
    this.unsortedContacts$ = this.dataBaseService.getData<Contact>('contacts'); // NOTE - Ich habe hier <Contact> angegeben, weil ich in der Funktion getData eine Typisierung verlange.
    this.contacts$ = this.sortContacts();
    this.generalService.activeNavBtn = 'contacts';
  }

  /**
   * Sorts the contacts alphabetically by name.
   * 
   * @returns {Observable<Contact[]>} A sorted observable of Contacts.
   */
  sortContacts(): Observable<Contact[]> {
    return this.unsortedContacts$.pipe(map(contacts => contacts.sort((a, b) => a.name.localeCompare(b.name))));
  }

  /**
   * Updates the selected contact in the ContactsService.
   * Displays the contact details view for the selected contact.
   */
  showContactDetails(contact: Contact) {
    this.contactsService.setSelectedContact(contact);
    this.contactsService.contactDetailsOpened = true;
  }

  /**
   * Opens the form for adding a new contact.
   */
  showAddContactForm() {
    this.contactsService.addContactFormOpened = true;
  }

}