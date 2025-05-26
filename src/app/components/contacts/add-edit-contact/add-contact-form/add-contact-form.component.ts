import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../../services/data-base.service';
// import { GeneralService } from '../../../../services/general.service';
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
  //providers: [DataBaseService] // Service hier bereitstellen!
})
export class AddContactFormComponent {

  generalService = inject(GeneralService);

  newContact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

  availableContactColors = ['orange', 'blue', 'violet', 'blueviolet', 'pink', 'green'];

  // contactAdded: boolean = false;

  @ViewChild('contactForm') contactForm!: NgForm; // Zugriff auf das Formular

  constructor(
    private dataBaseService: DataBaseService,
    // private generalService: GeneralService,
    private contactsService: ContactsService
  ) {}

  async onSubmit(form: NgForm) {
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
