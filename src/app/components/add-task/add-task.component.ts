import { Component, inject } from '@angular/core';
import { AddTaskFormComponent } from '../../shared/components/add-task-form/add-task-form.component';
import { GeneralService } from '../../services/general.service';
import { NotificationsComponent } from "../../shared/components/notifications/notifications.component";

@Component({
  selector: 'app-add-task',
  imports: [
    AddTaskFormComponent,
    NotificationsComponent
],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * Initializes the AddTaskComponent and sets the currently active navigation button in the general service to 'add-task'.
   * This is used to highlight the navigation button that corresponds to the currently opened section.
   */
  constructor() {
    this.generalService.activeNavBtn = 'add-task';
  }

}
