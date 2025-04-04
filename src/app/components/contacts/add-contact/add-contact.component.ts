import { Component, ViewChild } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DataBaseService } from '../../../data-base.service';


@Component({
  selector: 'app-add-contact',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
  providers: [DataBaseService] // Service hier bereitstellen!
})
export class AddContactComponent {

  // generalService = inject(GeneralService);

  newContact = {
      name: "",
      email: "",
      phone: ""
  };

  contactAdded: boolean = false;

  @ViewChild('contactForm') contactForm!: NgForm; // Zugriff auf das Formular

  constructor(
    private dataBaseService: DataBaseService,
    private generalService: GeneralService
  ) {}

  hideAddContactForm() {
    this.generalService.addContactFormOpened = false;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    try {
      console.log('Speichere Kontakt:', this.newContact);
      await this.dataBaseService.addData('contacts', this.newContact); // 'contacts' als Sammlungsname
      form.resetForm();
      this.contactAdded = true;
      setTimeout(() => {
        this.hideAddContactForm();
        this.contactAdded = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Kontakts: ', error);
    } finally {
    }
  }

}
