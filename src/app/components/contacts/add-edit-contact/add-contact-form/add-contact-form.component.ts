import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../../data-base.service';
import { GeneralService } from '../../../../general.service';
import { Contact } from './../../../../models/contact.model';

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
  ],
  providers: [DataBaseService] // Service hier bereitstellen!
})
export class AddContactFormComponent {

  newContact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

  availableContactColors = ['orange', 'blue', 'violet', 'blueviolet', 'pink', 'green']

  contactAdded: boolean = false;

  @ViewChild('contactForm') contactForm!: NgForm; // Zugriff auf das Formular

  constructor(
    private dataBaseService: DataBaseService,
    private generalService: GeneralService
  ) {}

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    this.newContact.color = this.availableContactColors[Math.floor(Math.random() * this.availableContactColors.length)];
    try {
      console.log('Speichere Kontakt:', this.newContact);
      await this.dataBaseService.addData('contacts', this.newContact); // 'contacts' als Sammlungsname
      form.resetForm();
      this.contactAdded = true;
      setTimeout(() => {
        this.generalService.hideContactForm();
        this.contactAdded = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Kontakts: ', error);
    }
    // finally {
    // }
  }

}
