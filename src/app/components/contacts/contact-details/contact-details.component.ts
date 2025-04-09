import { Component, inject, Input } from '@angular/core';
import { GeneralService } from '../../../general.service';
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

  displayedContact$!: Observable<Contact>; // wird async verwendet im Template

  @Input()displayedContact: any;

  generalService = inject(GeneralService);

  constructor() {
    this.displayedContact$ = this.generalService.selectedContact$;
  }

}
