import { Component, inject } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../general.service';

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

  generalService = inject(GeneralService);

  contacts = [
    {
      id: "1",
      name: "Katharina Hofstetter",
      email: "kathi.h@gmail.com",
      phone: "+436801234567"
    },
    {
      id: "2",
      name: "Martin Bauer",
      email: "martin.bauer@web.de",
      phone: "+436807654321"
    },
    {
      id: "3",
      name: "Anna Kopetzky",
      email: "a.kopetzky@posteo.de",
      phone: "+436801232149"
    }
  ];

  constructor() {
    this.generalService.activeNavBtn = 'contacts';
  }  

}
