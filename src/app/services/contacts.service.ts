import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { DataBaseService } from './data-base.service';
import { GeneralService } from './general.service';

/**
 * A service for managing contact-related state and operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  /**
   * Internal subject to manage the currently selected contact.
   * It emits the latest contact to all subscribers immediately.
   * 
   * @private
   * @type {BehaviorSubject<Contact | null>}
   */
  private selectedContactSubject: BehaviorSubject<Contact | null> = new BehaviorSubject<any>(null); //NOTE - Ein BehaviorSubject ist eine spezielle Art von Subject, das den neuesten Wert speichert und diesen Wert sofort an neue Abonnenten weitergibt.

  /**
   * Observable stream of the currently selected contact.
   * 
   * @type {Observable<Contact | null>}
   */
  selectedContact$: Observable<Contact | null> = this.selectedContactSubject.asObservable(); //NOTE - Das $-Suffix deutet an, dass es sich um einen Observable-Stream handelt.

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * Boolean flag indicating if the form to add a new contact is opened.
   * 
   * @type {boolean}
   */
  addContactFormOpened: boolean = false;  


  /**
   * Boolean flag indicating if the form to edit a selected contact is opened.
   * 
   * @type {boolean}
   */
  editContactFormOpened: boolean = false;

  /**
   * Boolean flag indicating if the contact details view is opened.
   * 
   * @type {boolean}
   */
  contactDetailsOpened: boolean = false;

  /**
   * The contact currently selected for editing.
   * 
   * @type {Contact | null}
   */
  contactToBeEdited: Contact | null = null;

  /**
   * The contact currently selected for deletion.
   * 
   * @type {Contact | null}
   */
  contactToBeDeleted: Contact | null = null;

  /**
   * Creates an instance of ContactsService.
   * 
   * @param {DataBaseService} dataBaseService - Service for CRUD operations with the database. //NOTE - C: Create, R: Read, U: Update, D: Delete
   */
  constructor(private dataBaseService: DataBaseService) { }

  /**
   * Updates the currently selected contact.
   * 
   * @param {Contact} contact - The currently selected contact.
   */
  setSelectedContact(contact: Contact) {
    this.selectedContactSubject.next(contact); //NOTE - Wenn this.selectedContactSubject.next(contact) aufgerufen wird, wird der Wert aktualisiert, und alle Abonnenten des selectedContact$-Streams erhalten sofort den neuen Wert.
  }

  /**
   * Sets the contact to be edited and opens the form to edit the selected contact.
   * 
   * @param {Contact} contact - The contact to be edited.
   */
  showEditContactForm(contact: Contact) {
    this.contactToBeEdited = contact;
    this.editContactFormOpened = true;
  }

  /**
   * Hides both the add and edit contact forms and clears the editing state.
   */
  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;
    this.contactToBeEdited = null;
  }

  /**
   * Hides the contact details view.
   */
  hideContactDetails() {
    this.contactDetailsOpened = false;
  }

  /**
   * Deletes the selected contact from the database.
   * Sets the 'contactToBeDeleted' to null.
   * Hides the confirmation for the contact deletion and the details view of the deleted contact.
   * Assures that the form to edit/delete a contact is hidden.
   * Temporarily shows a notification after successful deletion.
   * In case of an error, it displays an error notification.
   * 
   * @param {Contact} contact - The contact to be deleted.
   * @returns {Promise<void>}
   */
  async deleteContact(contact: Contact): Promise<void> {
    try {
      await this.dataBaseService.deleteData('contacts', contact.id);
      this.contactToBeDeleted = null;
      this.generalService.confirmationDeleteContact = false;
      this.hideContactDetails();
      this.hideContactForm();
      this.handleSuccessNotification();      
    } catch (error: any) {
      this.generalService.handleErrorNotification();
    }
  }

  /**
   * Displays a temporary success notification for contact deletion and hides it after 1 second.
   */
  handleSuccessNotification() {
    this.generalService.notificationContactDeleted = true;
    setTimeout(() => {
      this.generalService.notificationContactDeleted = false;
    }, 1000);
  }

}