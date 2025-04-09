import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  @Input()contact?: Contact; // Das Fragezeichen macht das Property optional, die Komponente benötigt beim Start also nicht zwingend einen Wert für contact. In Kombination mit @if (contact) in der HTML-Datei wird verhindert, dass die Komponente versucht auf contact zuzugreifen, wenn es noch gar nicht gesetzt wurde.

  // @Input()contact: Contact = {
  //   id: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   color: ''
  //}; // Es wird ein Default-Wert gesetzt, was vor allem hilfreich ist, falls der Input bei der Initialisierung kurz undefined ist.

}
