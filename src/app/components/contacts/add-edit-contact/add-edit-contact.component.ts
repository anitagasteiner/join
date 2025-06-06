import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './edit-contact-form/edit-contact-form.component';
import { Contact } from './../../../models/contact.model';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { ContactsService } from '../../../services/contacts.service';
import { GeneralService } from '../../../services/general.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';


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
    /**
     * Animation trigger for sliding in the form to add or edit a contact from the right.
     * Applies when the component enters the DOM.
     */
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AddEditContactComponent {

  /**
   * The contact to edit. Stays empty if a new contact is added.
   * @type {Contact}
   */
  @Input()contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * Instance of ContactsService used to manage contact data and operations.
   * @type {ContactsService}
   */
  contactsService: ContactsService = inject(ContactsService);

  /**
   * Observable of the currently selected contact, used for reactive display logic.
   * @type {Observable<Contact | null>}
   */
  selectedContact$: Observable<Contact | null> = this.contactsService.selectedContact$;

  constructor() { }

}
