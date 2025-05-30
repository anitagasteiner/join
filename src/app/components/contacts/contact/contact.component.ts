import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InitialsPipe } from '../../../pipes/initials.pipe';
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

  /**
   * Contact data passed from the parent component.
   * Used to display the contact in the contact list.
   * 
   * @type {Contact | undefined}
   */
  @Input()contact?: Contact; // NOTE - Das Fragezeichen macht das Property optional, die Komponente benötigt beim Start also nicht zwingend einen Wert für contact. In Kombination mit @if (contact) in der HTML-Datei wird verhindert, dass die Komponente versucht auf contact zuzugreifen, wenn es noch gar nicht gesetzt wurde.

}
