import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { map, Observable } from 'rxjs';
import { DataBaseService } from '../../services/data-base.service';
import { Task } from './../../models/task.model';
import { AddTaskFormComponent } from '../../shared/components/add-task-form/add-task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksService } from '../../services/tasks.service';
import { NoTasksComponent } from './no-tasks/no-tasks.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    DragDropModule,
    TaskComponent,
    AddTaskFormComponent,
    TaskDetailsComponent,
    NoTasksComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);
  tasksService = inject(TasksService);

  tasks$: Observable<Task[]>;

  todoCount$: Observable<number>;
  inProgressCount$: Observable<number>;
  waitingCount$: Observable<number>;
  doneCount$: Observable<number>;

  activeDropZone: string | null = null;

  // status: string[] = ['to-do', 'in-progress', 'waiting', 'done'];

  displayedTask: Task = {
        id: 'string',
        title: 'string',
        description: 'string',
        date: new Date(),
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

  constructor() {
    const originalTasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasks$ = originalTasks$.pipe(map(tasks => tasks.sort((a, b) => a.title.localeCompare(b.title))));
    this.generalService.activeNavBtn = 'board';
    this.todoCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'to-do').length)
    );
    this.inProgressCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'in-progress').length)
    );
    this.waitingCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'waiting').length)
    );
    this.doneCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'done').length)
    );
  }

  openAddTaskContainer(status: string) {
    this.tasksService.taskStatus = status;
    this.tasksService.addTaskContainerOpened = true;
  }

  showTaskDetails(task: Task) {
    this.displayedTask = task;
    this.tasksService.setCurrentTask(task);
    this.tasksService.taskDetailsOpened = true;
  }

  async drop(event: CdkDragDrop<Task[]>, newStatus: string) {
    const task: Task = event.item.data;
    if (task.status !== newStatus) {
      task.status = newStatus;
      await this.dataBaseService.updateData<Task>('tasks', task.id, task);
    }
    this.activeDropZone = null;
  }

  highlightDropZone(status: string) {
    this.activeDropZone = status;
  }

  removeHighlight(status: string) {
    if (this.activeDropZone === status) {
      this.activeDropZone = null;
    }
  }

}
