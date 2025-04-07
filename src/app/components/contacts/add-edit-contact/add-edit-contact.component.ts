import { Component, inject, Input } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { CommonModule } from '@angular/common';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './edit-contact-form/edit-contact-form.component';


@Component({
  selector: 'app-add-edit-contact',
  imports: [
    CommonModule,
    AddContactFormComponent,
    EditContactFormComponent
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss'
})
export class AddEditContactComponent {

  @Input()contact = {
    name: "Katharina Hofstetter",
    email: "kathi.h@gmail.com",
    phone: "+436801234567",
    color: ""
  };

  generalService = inject(GeneralService);

  constructor() {}  

  onContactUpdated() {
    this.generalService.hideContactForm();
  }

}
