import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { Observable } from 'rxjs';
import { Contact } from './../../../models/contact.model';
import { ContactsService } from '../../../services/contacts.service';
import { GeneralService } from '../../../services/general.service';

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
   * Observable that holds the currently selected (displayed) contact.
   * Used to bind contact details in the template.
   * 
   * @type {Observable<Contact | null>}
   */
  displayedContact$: Observable<Contact | null> = this.contactsService.selectedContact$; // NOTE - 'displayedContact$' wird als 'Observable<Contact>' deklariert und sofort auf den Wert des 'selectedContact$'-Streams aus dem ContactsService gesetzt.

  constructor() { }

  /**
   * Opens a confirmation dialog to delete the selected contact.
   * Sets the UI flag to show the confirmation and stores the contact to be deleted.
   * 
   * @param {Contact} displayedContact - The contact that is to be deleted.
   */
  openConfirmationDeleteContact(displayedContact: Contact) {
    this.generalService.confirmationDeleteContact = true;
    this.contactsService.contactToBeDeleted = displayedContact;
  } 

}