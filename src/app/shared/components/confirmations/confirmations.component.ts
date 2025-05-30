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

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * Instance of TasksService used to manage task data and operations.
   * 
   * @type {TasksService}
   */
  tasksService: TasksService = inject(TasksService);

  /**
   * Instance of ContactsService used to manage contact data and operations.
   * 
   * @type {ContactsService}
   */
  contactsService: ContactsService = inject(ContactsService);

  /**
   * Closes the confirmation dialog for task deletion.
   * Sets the 'confirmationDeleteTask' flag in the general service to 'false'.
   */
  closeConfirmationDeleteTask(): void {
    this.generalService.confirmationDeleteTask = false;
  }

  /**
   * Closes the confirmation dialog for contact deletion.
   * Sets the 'confirmationDeleteContact' flag in the general service to 'false'.
   */
  closeConfirmationDeleteContact(): void {
    this.generalService.confirmationDeleteContact = false;
  }

}