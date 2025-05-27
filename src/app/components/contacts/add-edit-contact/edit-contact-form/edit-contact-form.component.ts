import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../../services/data-base.service';
import { Contact } from './../../../../models/contact.model';
import { firstValueFrom, Observable } from 'rxjs';
import { ContactsService } from '../../../../services/contacts.service';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-edit-contact-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-contact-form.component.html',
  styleUrls: [
    './edit-contact-form.component.scss',
    './../add-edit-contact-form.scss'
  ]
})
export class EditContactFormComponent {

  /**
   * Contact data passed from the parent component.
   * Used to pre-fill the form for editing the contact.
   */
  @Input()contact!: Contact;

  /**
   * Event emitted after a contact has been successfully updated.
   */
  @Output()updated = new EventEmitter<void>();

  /**
   * Event emitted when the editing process is cancelled.
   */
  @Output()cancelled = new EventEmitter<void>();

  /**
   * Observable containing the list of all contacts.
   */
  contacts$: Observable<Contact[]>;

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
   * Temporary object to hold the edited contact data.
   * Initialized as a copy of the input contact.
   */
  editedContact: any = {};

  /**
   * Template reference to the contact form.
   */
  @ViewChild('contactForm') contactForm!: NgForm;

  /**
   * Initializes the EditContactFormComponent, loads the contacts.
   */
  constructor(private dataBaseService: DataBaseService) {
      this.contacts$ = this.dataBaseService.getData<Contact>('contacts');
  }

  /**
   * Lifecycle hook that initializes the form data with a copy of the passed contact to prevent direct mutation.
   */
  ngOnInit() {
    this.editedContact = { ...this.contact }; //NOTE - Kopie, nicht direktes Binding!
  }

  /**
   * Handles form submission.
   * Validates the form and updates the contact in the database.
   * Refreshes the displayed contact and resets the form.
   * Triggers the confirmation notification.
   * In case of an error, it displays an error notification.
   *
   * @param form - The submitted contact form.
   */
  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    try {
      await this.dataBaseService.updateData<any>('contacts', this.editedContact.id, {
        name: this.editedContact.name,
        email: this.editedContact.email,
        phone: this.editedContact.phone
      });
      this.refreshDisplayedContact(this.editedContact.id);
      form.resetForm();      
      this.contactsService.hideContactForm();
      this.handleNotification();
    } catch (error: any) {
      this.generalService.handleErrorNotification();
    }
  }

  /**
   * Displays a short success notification when a contact is edited and hides it again after 1 second.
   */
  handleNotification() {
    this.generalService.notificationContactEdited = true;
    setTimeout(() => {
      this.generalService.notificationContactEdited = false;
    }, 1000);    
  }

  /**
   * Cancels the editing process and emits the cancellation event.
   */
  onCancel() {
    this.cancelled.emit();
  }

  /**
   * Refreshes the displayed contact in the UI based on its ID.
   */
  async refreshDisplayedContact(contactId: string) {
    const contacts = await firstValueFrom(this.contacts$);
    const updatedContact = contacts.find(c => c.id === contactId);
    if (updatedContact) {
      this.contactsService.setSelectedContact(updatedContact);
    }
  }

}

//TODO - Bugfixing: Beim Editieren eines Kontaktes verschwindet die Contact Color.