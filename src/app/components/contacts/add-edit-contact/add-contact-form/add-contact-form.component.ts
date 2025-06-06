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
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);
  
  /**
   * The new contact that is being created.
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
   * Predefined list of colors that can be randomly assigned to a new contact.
   * @type {string[]}
   */
  availableContactColors: string[] = ['orange', 'blue', 'violet', 'blueviolet', 'pink', 'green'];

  /**
   * Reference to the contact form in the template.
   * Used for validation and resetting.
   * @type {NgForm}
   */
  @ViewChild('contactForm') contactForm!: NgForm; //NOTE - Zugriff auf das Formular

  /**
   * Creates an instance of the AddContactFormComponent.
   * @param {DataBaseService} dataBaseService - Service to interact with the Firebase Database.
   * @param {ContactsService} contactsService - Service to manage contact data and operations.
   */
  constructor(
    private dataBaseService: DataBaseService,
    private contactsService: ContactsService
  ) {}

  /**
   * Handles the submission of the form for creating a new contact.
   * Validates the form and assigns a random color to the contact.
   * Saves the contact to the database, resets the form and displays a confirmation notification.
   * In case of an error, it displays an error notification.
   * @param {NgForm} form - The submitted contact form.
   * @returns {Promise<void>}
   */
  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }
    this.setContactColor();    
    try {
      await this.dataBaseService.addData<Contact>('contacts', this.newContact); //NOTE - 'contacts' als Sammlungsname
      form.resetForm();
      this.contactsService.hideContactForm();
      this.handleNotification();      
    } catch (error: any) {
      this.generalService.handleErrorNotification();
    }
  }

  /**
   * Assigns a random color from the list of available contact colors to the 'newContact'.
   */
  setContactColor(): void {
    this.newContact.color = this.availableContactColors[Math.floor(Math.random() * this.availableContactColors.length)];
  }

  /**
   * Displays a short success notification when a contact is added and hides it again after 1 second.
   */
  handleNotification(): void {
    this.generalService.notificationContactAdded = true;
    setTimeout(() => {
      this.generalService.notificationContactAdded = false;
    }, 1000);
  }

}