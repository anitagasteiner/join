import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../../services/data-base.service';
import { Contact } from './../../../../models/contact.model';
import { ContactsService } from '../../../../services/contacts.service';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-add-contact-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-contact-form.component.html',
  styleUrls: [
    './add-contact-form.component.scss',
    './../add-edit-contact-form.scss'
  ]
})
export class AddContactFormComponent {

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);
  
  /**
   * The new contact that is being created.
   * 
   * @type {Contact}
   */
  newContact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

  /**
   * List of possible colors to assign to a new contact.
   * 
   * @type {string[]}
   */
  availableContactColors: string[] = ['orange', 'blue', 'violet', 'blueviolet', 'pink', 'green'];

  /**
   * Reference to the contact form in the template.
   * 
   * @type {NgForm}
   */
  @ViewChild('contactForm') contactForm!: NgForm; //NOTE - Zugriff auf das Formular

  /**
   * Creates an instance of the AddContactFormComponent.
   * 
   * @param {DataBaseService} dataBaseService - Service to interact with the Firebase Database.
   * @param {ContactsService} contactsService - Service to manage contact data and operations.
   */
  constructor(
    private dataBaseService: DataBaseService,
    private contactsService: ContactsService
  ) {}

  /**
   * Handles form submissions for creating a new contact.
   * Validates the form and assigns a random color to the contact.
   * Saves the contact to the database, resets the form and shows a notification.
   * 
   * @param {NgForm} form - The submitted contact form.
   * @returns {Promise<void>}
   */
  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    this.newContact.color = this.availableContactColors[Math.floor(Math.random() * this.availableContactColors.length)];
    try {
      console.log('Speichere Kontakt:', this.newContact);
      await this.dataBaseService.addData<Contact>('contacts', this.newContact); // 'contacts' als Sammlungsname
      form.resetForm();
      this.contactsService.hideContactForm();
      this.generalService.notificationContactAdded = true;
      setTimeout(() => {
        this.generalService.notificationContactAdded = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Kontakts: ', error);
    }
    // finally {
    // }
  }

}

//TODO Form Notifications!!!