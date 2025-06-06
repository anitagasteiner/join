import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { DataBaseService } from '../../../services/data-base.service';
import { Task } from '../../../models/task.model';
import { map, Observable } from 'rxjs';
import { Contact } from '../../../models/contact.model';
import { TasksService } from '../../../services/tasks.service';
import { TaskFormInput } from '../../../models/task-form-input';
import { GeneralService } from '../../../services/general.service';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  imports: [
    CommonModule,
    FormsModule,
    InitialsPipe,
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {

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
   * Reference to the subtask input element for focusing.
   * 
   * @type {ElementRef | undefined}
   */
  @ViewChild('subtaskInput', { static: false }) subtasks?: ElementRef;

  /**
   * Sorted list of contacts for task assignment.
   * 
   * @type {Observable<Contact[]>}
   */
  contacts$: Observable<Contact[]>;

  /**
   * Indicates if the 'category' selection is opened.
   * 
   * @type {boolean}
   */
  selectOpened: boolean = false;

  /**
   * Indicates if the dropdown containing the contacts to assign is opened.
   * 
   * @type {boolean}
   */
  dropdownOpened: boolean = false;

  /**
   * Available categories to choose from.
   * 
   * @type {string[]}
   */
  categories: string[] = ['Technical Task', 'User Story'];

  /**
   * Temporary subtask to be added to a task.
   * 
   * @type {{text: string, done: boolean}}
   */
  newSubtask: {text: string; done: boolean} = {
    text: '',
    done: false
  };

  /**
   * Indicates if a subtask is currently being entered.
   * 
   * @type {boolean}
   */
  subtaskBeingAdded: boolean = false;

  /**
   * Indicates if the title is missing.
   * 
   * @type {boolean}
   */
  titleMissing: boolean = false;

  /**
   * Indicates if the due date is missing.
   * 
   * @type {boolean}
   */
  dateMissing: boolean = false;

  /**
   * Indicates if the priority is missing.
   * 
   * @type {boolean}
   */
  priorityMissing: boolean = false;

  /**
   * Indicates if the category is missing.
   * 
   * @type {boolean}
   */
  categoryMissing: boolean = false;

  /**
   * Initializes the AddTaskFormComponent.
   * Loads the contacts to choose from to assign to the tasks and sorts them alphabetically by name.
   */
  constructor() {
    const originalContacts$ = this.dataBaseService.getData<Contact>('contacts');
    this.contacts$ = originalContacts$.pipe(map(contacts => contacts.sort((a, b) => a.name.localeCompare(b.name))));
  }

  /**
   * Converts the form input into a Task object.
   * 
   * @param {TaskFormInput} taskFormInput - The input from the task form.
   * @returns {Task} The constructed Task object.
   */
  convertFormToTask(taskFormInput: TaskFormInput): Task {
    return {
      id: '', //NOTE - wird später von Firestore generiert
      title: taskFormInput.title,
      description: taskFormInput.description,
      date: new Date(taskFormInput.date),
      priority: taskFormInput.priority,
      assigned: taskFormInput.assigned,
      category: taskFormInput.category,
      subtasks: taskFormInput.subtasks,
      status: this.tasksService.taskStatus,
    };
  }

  /**
   * Toggles the visibility of the assign contacts dropdown.
   */
  toggleAssignedDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  /**
   * Closes the assign contacts dropdown with a slight delay to allow checkbox interactions to complete before hiding the element.
   */
  closeAssignedDropdown(): void {
    setTimeout(() => {
      this.dropdownOpened = false;
    }, 150);
  }

  /**
   * Checks if a contact is already selected for assignment.
   * 
   * @param {Contact} contact - The contact to check.
   * @returns {boolean}
   */
  contactIsSelected(contact: Contact): boolean {
    return this.tasksService.assignedContacts.some(c => c.id === contact.id);
  }
  
  /**
   * Adds or removes a contact from the list of assigned contacts.
   * 
   * @param {Event} event - The checkbox event.
   * @param {Contact} contact - The contact being toggled.
   */
  toggleContactSelection(event: Event, contact: Contact): void {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;
    if (checked) {
      this.tasksService.assignedContacts.push({
        id: contact.id,
        name: contact.name,
        color: contact.color
      });
    } else {
      this.tasksService.assignedContacts = this.tasksService.assignedContacts.filter(c => c.id !== contact.id);
    }
  }

  /**
   * Toggles the visibility of the category selection dropdown.
   */
  toggleCategoryOpenClose(): void {
    this.selectOpened = !this.selectOpened;
  }

  /**
   * Focuses the subtask input field and activates edit mode.
   */
  setFocusOnSubtaskInput(): void {
    this.subtasks?.nativeElement.focus();
    this.addingSubtask();
  }

  /**
   * Marks that a new subtask is currently being added.
   * Sets the 'subtaskBeingAdded' flag to 'true' to control the UI state.
   */
  addingSubtask(): void {
    this.subtaskBeingAdded = true;
  }

  /**
   * Resets the subtask input state after adding or canceling.
   * Sets 'subtaskBeingAdded' to 'false' and clears the subtask text.
   */
  stopAddingSubtask(): void {
    this.subtaskBeingAdded = false;
    this.newSubtask.text = '';
  }

  /**
   * Adds a subtask to the list if it doesn't already exist.
   */
  addSubtask(): void {
    if (this.newSubtask.text !== '' && !this.checkIfSubtaskPresent(this.newSubtask.text)) {
      this.tasksService.newSubtasks.push({ ...this.newSubtask });
      this.newSubtask.text = '';
      this.subtaskBeingAdded = false;
    }
  }

  /**
   * Checks whether a subtask with the same text already exists.
   * 
   * @param {string} newSubtask - The subtask text to check.
   * @returns {boolean}
   */
  checkIfSubtaskPresent(newSubtask: string): boolean {
    return this.tasksService.newSubtasks.some(entry => entry.text === newSubtask);
  }

  /**
   * Allows editing an existing subtask by setting its value in the input.
   * 
   * @param {{text: string, done: boolean}} entry - The subtask entry to edit.
   */
  editSubtask(entry: {text: string, done: boolean}): void {
    this.deleteSubtask(entry.text);
    this.setFocusOnSubtaskInput();
    this.newSubtask.text = entry.text;
    this.newSubtask.done = entry.done;
  }

  /**
   * Deletes a subtask by its text.
   * 
   * @param {string} subtaskText - The text of the subtask to be deleted.
   */
  deleteSubtask(subtaskText: string): void {
    this.tasksService.newSubtasks = this.tasksService.newSubtasks.filter(entry => entry.text !== subtaskText );
  }

  /**
   * Resets the form and clears all relevant task form states.
   * Closes the add/edit task form container.
   * 
   * @param {NgForm} form - The form instance to reset.
   */
  resetForm(form: NgForm): void {
    form.resetForm();
    this.emptyNewTask();    
    this.tasksService.selectedPriority = 'medium';
    this.tasksService.assignedContacts = [];
    this.tasksService.newSubtasks = [];
    this.tasksService.addTaskContainerOpened = false;
    this.tasksService.editTaskContainerOpened = false;
    this.titleMissing = false;
    this.dateMissing = false;
    this.categoryMissing = false;
    this.priorityMissing = false;
  }

  /**
   * Empties the 'newTask' form data model in the tasks service.
   */
  emptyNewTask(): void {
    this.tasksService.newTask = {
      title: '',
      description: '',
      date: '',
      priority: '',
      assigned: [],
      category: '',
      subtasks: [],
    };
  }

  /**
   * Handles form submission.
   * Validates the form and prepares the task data; then adds or updates a task based on context.
   * Triggers the corresponding success notification.
   * Resets the form and sets the 'taskStatus' in the tasks services to its default value ('to-do').
   * Closes the form container.
   * In case of an error, it displays an error notification.
   * 
   * @param {NgForm} form - The form being submitted.
   */
  async onSubmit(form: NgForm): Promise<void> {
    this.checkMissingValues();
    if (form.invalid || this.priorityMissing || this.categoryMissing) {
      return;
    }
    this.getNewTaskData();    
    const taskToSave = this.convertFormToTask(this.tasksService.newTask);
    try {
      if (this.tasksService.editTaskContainerOpened && this.tasksService.taskToBeEdited.id) {
        await this.dataBaseService.updateData<Task>('tasks', this.tasksService.taskToBeEdited.id, { ...taskToSave, id:this.tasksService.taskToBeEdited.id, status:this.tasksService.taskToBeEdited.status});
        this.handleSuccessNotificationTaskEdited();
      } else {
        await this.dataBaseService.addData<Task>('tasks', taskToSave); //NOTE - 'tasks' als Sammlungsname
        this.handleSuccessNotificationTaskAdded();        
      }
      this.resetForm(form);
      this.tasksService.taskStatus = 'to-do';
      setTimeout(() => {
        this.closeFormContainer();        
      }, 1000);
    } catch (error: any) {
      this.generalService.handleErrorNotification();
    }
  }
 
  /**
   * Checks if any required fields are missing to handle the notifications.
   */
  checkMissingValues(): void {
    if (!this.tasksService.newTask.title) {
      this.titleMissing = true;
    } else {
      this.titleMissing = false;
    }
    if (!this.tasksService.newTask.date) {
      this.dateMissing = true;
    } else {
      this.dateMissing = false;
    }
    if (!this.tasksService.selectedPriority) {
      this.priorityMissing = true;
    }
    if (!this.tasksService.selectedCategory) {
      this.categoryMissing = true;
    }
  }

  /**
   * Collects and stores form data into the task service model.
   */
  getNewTaskData(): void {
    this.tasksService.newTask.priority = this.tasksService.selectedPriority;
    this.tasksService.newTask.assigned = this.tasksService.assignedContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      color: contact.color
    })); 
    this.tasksService.newTask.category = this.tasksService.selectedCategory;
    this.tasksService.newTask.subtasks = [...this.tasksService.newSubtasks];
  }

  /**
   * Displays a temporary success notification after a task has been edited and hides it after 1 second.
   */
  handleSuccessNotificationTaskEdited(): void {
    this.generalService.notificationTaskEdited = true;
    setTimeout(() => {
      this.generalService.notificationTaskEdited = false;
    }, 1000);    
  }

  /**
   * Displays a temporary success notification after a new task has been added and hides it after 1 second.
   */
  handleSuccessNotificationTaskAdded(): void {
    this.generalService.notificationTaskAdded = true;
    setTimeout(() => {
      this.generalService.notificationTaskAdded = false;
    }, 1000);
  }

  /**
   * Closes the task form container (both add and edit modes).
   */
  closeFormContainer(): void {
    this.tasksService.addTaskContainerOpened = false;
    this.tasksService.editTaskContainerOpened = false;    
  }

}
