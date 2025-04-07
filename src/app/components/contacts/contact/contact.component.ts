import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InitialsPipe } from '../../../initials.pipe';


@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @Input()contact = {
    name: "Katharina Hofstetter",
    email: "kathi.h@gmail.com",
    phone: "+436801234567",
    color: ""
  };

  showContactDetails() {
    console.log('show contact details');
  }

}
