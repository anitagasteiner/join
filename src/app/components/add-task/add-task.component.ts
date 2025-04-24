import { Component, inject } from '@angular/core';
import { AddTaskFormComponent } from '../../shared/components/add-task-form/add-task-form.component';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-add-task',
  imports: [
    AddTaskFormComponent
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent{

  generalService = inject(GeneralService);

  constructor() {
    this.generalService.activeNavBtn = 'add-task';
  }

}
