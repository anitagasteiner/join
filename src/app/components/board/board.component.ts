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
  unsortedTasks$: Observable<Task[]>;

  /**
   * Observable stream of all tasks, sorted by title.
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
   * Initializes the BoardComponent, loads, sorts and filters the tasks.
   * Sets up counters depending on the tasks' statuses.
   * Sets the currently active navigation button in the general service to 'board'. This is used to highlight the navigation button that corresponds to the currently opened section.
   */
  constructor() {    
    this.unsortedTasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasks$ = this.sortTasks();
    this.filteredTasks$ = this.filterTasks();
    this.todoCount$ = this.countTasks('to-do');
    this.inProgressCount$ = this.countTasks('in-progress');
    this.waitingCount$ = this.countTasks('waiting');
    this.doneCount$ = this.countTasks('done');
    this.generalService.activeNavBtn = 'board';
  }

  /**
   * Sorts the tasks alphabetically by title.
   * 
   * @returns {Observable<Task[]>} A sorted observable of Tasks.
   */
  sortTasks(): Observable<Task[]> {
    return this.unsortedTasks$.pipe(map(tasks => tasks.sort((a, b) => a.title.localeCompare(b.title))));    
  }

  /**
   * Filters the sorted tasks based on the current search term.
   * 
   * @returns {Observable<Task[]>} Filtered task stream.
   */
  filterTasks(): Observable<Task[]> {
    return combineLatest([
      this.tasks$,
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
  }

  /**
   * Counts tasks that match the given status.
   * 
   * @param {string} status - The task status to filter by.
   * @returns {Observable<number>} Count of tasks with the given status.
   */
  countTasks(status: string): Observable<number> {
    return this.unsortedTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === status).length)
    );    
  }

  /**
   * Opens the UI container to add a new task with the specified status.
   * 
   * @param {string} status - The status to assign to the new task.
   */
  openAddTaskContainer(status: string): void {
    this.tasksService.taskStatus = status;
    this.tasksService.addTaskContainerOpened = true;
  }

  /**
   * Displays the details of the selected task.
   * 
   * @param {Task} task - The task to display in detail view.
   */
  showTaskDetails(task: Task): void {
    this.displayedTask = task;
    this.tasksService.setCurrentTask(task);
    this.tasksService.taskDetailsOpened = true;
  }

  /**
   * Handles the task drop event, updates the task's status and persits the change.
   * 
   * @param {CdkDragDrop<Task[]>} event - The drag and drop event.
   * @param {string} newStatus - The new status to assign to the dropped task.
   */
  async drop(event: CdkDragDrop<Task[]>, newStatus: string): Promise<void> {
    const task: Task = event.item.data;
    if (task.status !== newStatus) {
      task.status = newStatus;
      await this.dataBaseService.updateData<Task>('tasks', task.id, task);
    }
    this.activeDropZone = null;
  }

  /**
   * Sets the currently active drop zone to visually highlight this area.
   * 
   * @param {string} status - The status of the drop zone to highlight.
   */
  highlightDropZone(status: string): void {
    this.activeDropZone = status;
  }

  /**
   * Removes the highlight from the drop zone when it's not active any more.
   * 
   * @param {string} status - The status of the drop zone to unhighlight.
   */
  removeHighlight(status: string): void {
    if (this.activeDropZone === status) {
      this.activeDropZone = null;
    }
  }

}