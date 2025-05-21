import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './edit-contact-form/edit-contact-form.component';
import { Contact } from './../../../models/contact.model';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { ContactsService } from '../../../services/contacts.service';
import { GeneralService } from '../../../services/general.service';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-add-edit-contact',
  imports: [
    CommonModule,
    InitialsPipe,
    AddContactFormComponent,
    EditContactFormComponent
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AddEditContactComponent {

  @Input()contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };  

  generalService = inject(GeneralService);
  contactsService = inject(ContactsService);

  selectedContact$ = this.contactsService.selectedContact$;

  constructor() {}  

  onContactUpdated() {
    this.contactsService.hideContactForm();
  }

}
