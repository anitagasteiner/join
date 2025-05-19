import { Component, inject } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
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

  closeConfirmationDeleteTask() {
    this.generalService.confirmationDeleteTask = false;
  }

  closeConfirmationDeleteContact() {
    this.generalService.confirmationDeleteContact = false;
  }

}
