import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../../services/data-base.service';
import { GeneralService } from '../../../../services/general.service';
import { Contact } from './../../../../models/contact.model';

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

  @Input()contact!: Contact; // kommt zB aus der Liste
  @Output()updated = new EventEmitter<void>();
  @Output()cancelled = new EventEmitter<void>();

  generalService = inject(GeneralService);

  editedContact: any = {};
  contactEdited: boolean = false;

  @ViewChild('contactForm') contactForm!: NgForm; // Zugriff auf das Formular

  constructor(private dataBaseService: DataBaseService) {}

  ngOnInit() {
    this.editedContact = { ...this.contact }; // Kopie, nicht direktes Binding!
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    try {
      console.log('Ändere Kontakt:', this.editedContact);
      await this.dataBaseService.updateData<any>('contacts', this.editedContact.id, {
        name: this.editedContact.name,
        email: this.editedContact.email,
        phone: this.editedContact.phone
      });
      form.resetForm();
      this.contactEdited = true;
      setTimeout(() => {
        this.generalService.hideContactForm();
        this.contactEdited = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Ändern des Kontakts: ', error);
    }
    // finally {
    // }
  }

  onCancel() {
    this.cancelled.emit(); // zB Modal schließen
  }

}
