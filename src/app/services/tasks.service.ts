import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { DataBaseService } from './data-base.service';
import { TaskFormInput } from '../models/task-form-input';
import { GeneralService } from './general.service';

/**
 * A service for managing task-related state and operations.
 */
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  /**
   * Internal subject to manage the currently selected task.
   * Emits the currently selected task to all subscribers immediately.
   * 
   * @private
   * @type {BehaviorSubject<Task | null>}
   */
  private currentTaskSubject: BehaviorSubject<Task | null> = new BehaviorSubject<any>(null);

  /**
   * Observable stream of the currently selected task.
   * 
   * @type {Observable<Task | null>}
   */
  currentTask$: Observable<Task | null> = this.currentTaskSubject.asObservable();

  /**
   * Instance of GeneralService used to interact with general data and operations.
   * 
   * @type {GeneralService}
   */
  generalService: GeneralService = inject(GeneralService);

  /**
   * The new task that is being created.
   * 
   * @type {TaskFormInput}
   */
  newTask: TaskFormInput = {
    title: '',
    description: '',
    date: '',
    priority: '',
    assigned: [],
    category: '',
    subtasks: []
  };

  /**
   * The task that is currently being edited.
   * 
   * @type {Task}
   */
  taskToBeEdited: Task = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
    priority: '',
    assigned: [],
    category: '',
    subtasks: [],
    status: ''
  }

  /** 
   * The task that is selected for deletion.
   * 
   * @type {Task | null}
   */
  taskToBeDeleted: Task | null = null;

  /**
   * Currently selected priority.
   * 
   * @type {string}
   */
  selectedPriority: string = '';

  /**
   * List of contacts assigned to the task.
   *
   * @type {Array<{id: string; name: string; color: string}>}
   */
  assignedContacts: {id: string; name: string, color: string}[] = [];

  /**
   * Currently selected category.
   * 
   * @type {string}
   */
  selectedCategory: string = '';

  /**
   * List of new subtasks.
   * 
   * @type {Array<{ text: string; done: boolean }>}
   */
  newSubtasks: {text: string; done: boolean}[] = [];

  /**
   * Indicates if the 'add task' UI container is open.
   * 
   * @type {boolean}
   */
  addTaskContainerOpened: boolean = false;

  /**
   * Indicates if the 'edit task' UI container is open.
   * 
   * @type {boolean}
   */
  editTaskContainerOpened: boolean = false;

  /**
   * Indicates if the task details view is open.
   * 
   * @type {boolean}
   */
  taskDetailsOpened: boolean = false;

  /**
   * Task status ('to-do', 'in-progress', 'waiting' or 'done').
   * Default status: 'to-do'.
   * 
   * @type {string}
   */
  taskStatus: string = 'to-do';

  /**
   * Creates an instance of TasksService.
   * 
   * @param {DataBaseService} dataBaseService - Service to interact with the Firestore database.
   */
  constructor(private dataBaseService: DataBaseService) { }

  /**
   * Hides the task details view.
   */
  hideTaskDetails(): void {
    this.taskDetailsOpened = false;
  }

  /**
   * Sets the currently selected task to be used in the detail view.
   *
   * @param {Task} task - The task to set as current.
   */  
  setCurrentTask(task: Task): void {
    this.currentTaskSubject.next(task);
  }

  /**
   * Toggles the completion status of a given subtask and updates the task in the database.
   *
   * @param {Task} task - The parent task containing the subtask.
   * @param {{ text: string; done: boolean }} subtask - The subtask to toggle.
   */
  async toggleSubtaskDone(task: Task, subtask: { text: string; done: boolean }): Promise<void> {
    const subtaskToBeEdited = task.subtasks.find(st => st.text === subtask.text);
    if (subtaskToBeEdited && subtask.done === true) {
      subtaskToBeEdited.done = false;      
    } else if (subtaskToBeEdited && subtask.done === false) {
      subtaskToBeEdited.done = true;      
    }
    await this.dataBaseService.updateData<Task>('tasks', task.id, { ...task, subtasks: task.subtasks});
  }

  /**
   * Deletes a task from the database and updates related UI state.
   * Shows a success notification or triggers an error handler if deletion fails.
   *
   * @param {Task} task - The task to delete.
   */
  async deleteTask(task: Task): Promise<void> {
    try {
      await this.dataBaseService.deleteData('tasks', task.id);
      this.taskToBeDeleted = null;
      this.generalService.confirmationDeleteTask = false;
      this.hideTaskDetails();
      this.handleSuccessNotification();
    } catch (error: any) {
      this.generalService.handleErrorNotification();
    }
  }

  /**
   * Displays a temporary success notification after task deletion and hides it after 1 second.
   */
  handleSuccessNotification() {
    this.generalService.notificationTaskDeleted = true;
    setTimeout(() => {
      this.generalService.notificationTaskDeleted = false;
    }, 1000);
  }

}