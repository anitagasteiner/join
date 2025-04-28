import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../initials.pipe';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { TasksService } from '../../../services/tasks.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-task-details',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './task-details.component.html',
  styleUrls: [
    './task-details.component.scss',
    './../task-general.scss'
  ]
})
export class TaskDetailsComponent {

  // @Input()currentTask!: Task;
  generalService = inject(GeneralService);
  tasksService = inject(TasksService);

  displayedTask$: Observable<Task> = this.tasksService.currentTask$; // displayedTask$ wird als Observable<Task> deklariert und sofort auf den Wert des currentTask$-Streams aus dem TasksService gesetzt

  constructor() {}

}
