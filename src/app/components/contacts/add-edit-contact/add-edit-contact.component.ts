import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { CommonModule } from '@angular/common';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { EditContactFormComponent } from './edit-contact-form/edit-contact-form.component';


@Component({
  selector: 'app-add-edit-contact',
  imports: [
    CommonModule,
    AddContactFormComponent,
    EditContactFormComponent
  ],
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss'
})
export class AddEditContactComponent {

  generalService = inject(GeneralService);

  constructor() {}  

}
