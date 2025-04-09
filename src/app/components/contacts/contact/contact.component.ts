import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { InitialsPipe } from '../../../initials.pipe';
import { Contact } from './../../../models/contact.model';

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

  @Input()contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    color: ''
  };

}
