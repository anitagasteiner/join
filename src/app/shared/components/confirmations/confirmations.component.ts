import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { TasksService } from '../../../services/tasks.service';
import { ContactsService } from '../../../services/contacts.service';
'../models/task.model';

@Component({
  selector: 'app-confirmations',
  imports: [],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.scss'
})
export class ConfirmationsComponent {

  generalService = inject(GeneralService);
  tasksService = inject(TasksService);
  contactsService = inject(ContactsService);

  closeConfirmationDeleteTask() {
    this.generalService.confirmationDeleteTask = false;
  }

  closeConfirmationDeleteContact() {
    this.generalService.confirmationDeleteContact = false;
  }

}
