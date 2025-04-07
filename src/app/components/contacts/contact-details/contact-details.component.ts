import { Component, Input } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../initials.pipe';

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

  @Input()displayedContact: any;

  constructor(private generalService: GeneralService) {}

  showEditContactForm() {
    this.generalService.editContactFormOpened = true;
  }

}
