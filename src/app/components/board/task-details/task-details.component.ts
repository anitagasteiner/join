import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { TasksService } from '../../../services/tasks.service';
import { GeneralService } from '../../../services/general.service';
import { trigger, style, animate, transition } from '@angular/animations';

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
  ],
    animations: [
    /**
     * Animation trigger for sliding in the task details panel from the right.
     */
      trigger('slideIn', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ])      
      ])
    ]
})
export class TaskDetailsComponent {

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
   * Observable emitting the currently displayed task.
   * Subscribes to the currentTask$ observable from TasksService.
   * 
   * @type {Observable<Task>}
   */
  displayedTask$: Observable<Task> = this.tasksService.currentTask$;

  constructor() {}


  /**
   * Opens the form to edit a given task.
   * Adjusts visibility flags and prepares the form data.
   * 
   * @param {Task} task - The currently displayed task to be edited.
   */
  openFormToEditTask(task: Task) {
    this.tasksService.taskDetailsOpened = false;
    this.tasksService.addTaskContainerOpened = true;
    this.tasksService.editTaskContainerOpened = true;
    this.insertDataIntoForm(task);
    this.prepareDataToBeEdited(task);
  }

  /**
   * Inserts the data of the task into the 'newTask' object in TasksService.
   * These data are used to fill in the form.
   * 
   * @param {Task} task - The task to be edited.
   */
  insertDataIntoForm(task: Task) {
    this.tasksService.newTask = {
      title: task.title,
      description: task.description,
      date: this.convertDateToString(task.date),
      priority: task.priority,
      assigned: task.assigned,
      category: task.category,
      subtasks: task.subtasks,
    };
    this.tasksService.selectedPriority = task.priority;
    this.tasksService.assignedContacts = task.assigned;
    this.tasksService.selectedCategory = task.category;
    this.tasksService.newSubtasks = task.subtasks;
  }

  /**
   * Converts a Date object to a string formatted as 'YYYY-MM-DD'.
   * 
   * @param {Date} date - The date to be converted.
   * @returns {string} - The formatted date string.
   */
  convertDateToString(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Prepares the task data to be edited.
   * Copies all relevant task properties to the 'taskToBeEdited' object in the tasks service.
   * 
   * @param {Task} task - The task to prepare for editing.
   */
  prepareDataToBeEdited(task: Task) {
    this.tasksService.taskToBeEdited = {
      id: task.id,
      title: task.title,
      description: task.description,
      date: new Date(task.date),
      priority: task.priority,
      assigned: task.assigned,
      category: task.category,
      subtasks: task.subtasks,
      status: task.status
    };
  }

  /**
   * Opens a confirmation dialog for deleting the given task.
   * Sets the deletion target task in the tasks service and shows confirmation UI.
   * 
   * @param {Task} displayedTask - The task to be deleted.
   */
  openConfirmationDeleteTask(displayedTask: Task) {
    this.generalService.confirmationDeleteTask = true;
    this.tasksService.taskToBeDeleted = displayedTask;
  }  

}