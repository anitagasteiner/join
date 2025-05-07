import { Component, inject, Input } from '@angular/core';
// import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './edit-contact-form/edit-contact-form.component';
import { Contact } from './../../../models/contact.model';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { ContactsService } from '../../../services/contacts.service';


@Component({
  selector: 'app-add-edit-contact',
  imports: [
    CommonModule,
    InitialsPipe,
    AddContactFormComponent,
    EditContactFormComponent
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss'
})
export class AddEditContactComponent {

  @Input()contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };  

  // generalService = inject(GeneralService);
  contactsService = inject(ContactsService);

  selectedContact$ = this.contactsService.selectedContact$;

  constructor() {}  

  onContactUpdated() {
    this.contactsService.hideContactForm();
  }

}
