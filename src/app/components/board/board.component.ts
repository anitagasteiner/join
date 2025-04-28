import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { map, Observable } from 'rxjs';
import { DataBaseService } from '../../services/data-base.service';
import { Task } from './../../models/task.model';
import { AddTaskFormComponent } from '../../shared/components/add-task-form/add-task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    TaskComponent,
    AddTaskFormComponent,
    TaskDetailsComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  tasks$: Observable<Task[]>;

  displayedTask: Task = {
        id: 'string',
        title: 'string',
        description: 'string',
        date: null,
        priority: 'string',
        assigned: [{
          id: 'string',
          name: 'string',
          color: 'string'
        }],
        category: 'string',
        subtasks: [{
          text: 'string',
          done: false
        }],
        status: ''
  }

  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);

  constructor() {
    const originalTasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasks$ = originalTasks$.pipe(map(tasks => tasks.sort((a, b) => a.title.localeCompare(b.title))));
    this.generalService.activeNavBtn = 'board';
  }

  openAddTaskContainer(status: string) {
    this.generalService.taskStatus = status;
    this.generalService.addTaskContainerOpened = true;
  }

  showTaskDetails(task: Task) {
    this.displayedTask = task;
    this.generalService.setCurrentTask(task);
    this.generalService.taskDetailsOpened = true;
  }

}
