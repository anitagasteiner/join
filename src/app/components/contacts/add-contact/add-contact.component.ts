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

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  @ViewChild('contactForm') contactForm!: NgForm; // Zugriff auf das Formular

  constructor(
    private dataBaseService: DataBaseService,
    private generalService: GeneralService
  ) {}

  hideAddContactForm() {
    this.generalService.addContactFormOpened = false;
  }

  async onSubmit(form: NgForm) {
    console.log('onSubmit wurde aufgerufen');
    if (form.invalid) {
      console.log('form invalid');
      this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    try {
      console.log('Speichere Kontakt:', this.newContact);
      await this.dataBaseService.addData('contacts', this.newContact); // 'contacts' als Sammlungsname
      this.successMessage = 'Kontakt erfolgreich gespeichert!';
      form.resetForm();
      this.hideAddContactForm();
    } catch (error: any) {
      this.errorMessage = 'Fehler beim Speichern des Kontakts: ' + error.message;
      console.error('Fehler beim Speichern des Kontakts: ', error);
    } finally {
      this.isLoading = false;
    }
  }

}
