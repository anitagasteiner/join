import { Component, inject } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../general.service';
import { DataBaseService } from '../../data-base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  contacts$: Observable<any[]>;

  generalService = inject(GeneralService);

  constructor(private dataBaseService: DataBaseService) {
    this.contacts$ = this.dataBaseService.getData('contacts');
    this.generalService.activeNavBtn = 'contacts';
  }

}
