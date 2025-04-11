import { Component, inject, Input } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../initials.pipe';
import { Observable } from 'rxjs';
import { Contact } from './../../../models/contact.model';

@Component({
  selector: 'app-contact-details',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  @Input()displayedContact!: Contact;

  generalService = inject(GeneralService);

  displayedContact$: Observable<Contact> = this.generalService.selectedContact$; // displayedContact$ wird als Observable<Contact> deklariert und sofort auf den Wert des selectedContact$-Streams aus dem GeneralService gesetzt

  constructor() {
    // this.displayedContact$ = this.generalService.selectedContact$;
  }

}
