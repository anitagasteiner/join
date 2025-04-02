import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @Input()contact = {
    id: "1",
    name: "Katharina Hofstetter",
    email: "kathi.h@gmail.com",
    phone: "+436801234567"
  };

}
