import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';
import { DataBaseService } from '../../services/data-base.service';
import { Task } from './../../models/task.model';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksService } from '../../services/tasks.service';
import { NoTasksComponent } from './no-tasks/no-tasks.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';
import { ConfirmationsComponent } from '../../shared/components/confirmations/confirmations.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    TaskComponent,
    TaskDetailsComponent,
    NoTasksComponent,
    NotificationsComponent,
    ConfirmationsComponent,
    AddEditTaskComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

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
   * Instance of DataBaseService for accessing the Firebase Database.
   * 
   * @type {DataBaseService}
   */
  dataBaseService: DataBaseService = inject(DataBaseService);


  /**
   * FormControl for managing the task search input.
   * 
   * @type {FormControl}
   */
  searchControl: FormControl = new FormControl('');

  /**
   * Observable stream of all tasks.
   * 
   * @type {Observable<Task[]>}
   */
  tasks$: Observable<Task[]>;

  /**
   * Observable stream of tasks filtered by task search input.
   * 
   * @type {Observable<Task[]>}
   */
  filteredTasks$: Observable<Task[]>;

  /**
   * Observable emitting the number of tasks with status 'to-do'.
   * 
   * @type {Observable<number>}
   */
  todoCount$: Observable<number>;

  /**
   * Observable emitting the number of tasks with status 'in-progress'.
   * 
   * @type {Observable<number>}
   */
  inProgressCount$: Observable<number>;

  /**
   * Observable emitting the number of tasks with status 'waiting'.
   * 
   * @type {Observable<number>}
   */
  waitingCount$: Observable<number>;

  /**
   * Observable emitting the number of tasks with status 'done'.
   * 
   * @type {Observable<number>}
   */
  doneCount$: Observable<number>;

  /**
   * Currently highlighted drop zone during drag & drop.
   * 
   * @type {(string | null)}
   */
  activeDropZone: string | null = null;

  /**
   * The task that's details are currently displayed.
   * 
   * @type {Task}
   */
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

  /**
   * Initializes the BoardComponent, loads and filters tasks, sets up counters.
   * Sets the currently active navigation button in the general service to 'board'. This is used to highlight the navigation button that corresponds to the currently opened section. //TODO - Hier weiter mit JSDoc; vorher aber den Constructor vereinfachen, Teile auslagern!
   * 
   */
  constructor() {
    const originalTasks$ = this.dataBaseService.getData<Task>('tasks');
    const allTasks$ = originalTasks$.pipe(map(tasks => tasks.sort((a, b) => a.title.localeCompare(b.title))));
    this.tasks$ = allTasks$;
    this.filteredTasks$ = combineLatest([
      allTasks$,
      this.searchControl.valueChanges.pipe(startWith(''), debounceTime(200))
    ]).pipe(
      map(([tasks, search]) => {
        const term = (search ?? '').toLowerCase();
        return tasks.filter(task =>
          task.title.toLowerCase().includes(term)
          // || task.description?.toLowerCase().includes(term)
        );
      })
    );
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
