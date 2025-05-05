import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InitialsPipe } from '../../../initials.pipe';
import { DataBaseService } from '../../../services/data-base.service';
import { Task } from '../../../models/task.model';
import { map, Observable } from 'rxjs';
import { Contact } from '../../../models/contact.model';
import { TasksService } from '../../../services/tasks.service';
import { TaskFormInput } from '../../../models/task-form-input';

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
  
  tasksService = inject(TasksService);
  dataBaseService = inject(DataBaseService);

  @ViewChild('subtaskInput', { static: false }) subtasks?: ElementRef;

  contacts$: Observable<Contact[]>;

  // selectedPriority: string = '';
  selectOpened: boolean = false;

  dropdownOpened: boolean = false;
  // assignedContacts: {id: string; name: string, color: string}[] = [];

  categories = ['Technical Task', 'User Story'];  
  selectedCategory: string = '';

  newSubtask: {text: string; done: boolean} = {
    text: '',
    done: false
  };
  newSubtasks: {text: string; done: boolean}[] = [];
  subtaskBeingAdded: boolean = false;

  taskAdded: boolean = false;

  constructor() {
    const originalContacts$ = this.dataBaseService.getData<Contact>('contacts');
    this.contacts$ = originalContacts$.pipe(map(contacts => contacts.sort((a, b) => a.name.localeCompare(b.name))));
  }

  convertFormToTask(taskFormInput: TaskFormInput): Task {
    return {
      id: '', // wird später von Firestore generiert
      title: taskFormInput.title,
      description: taskFormInput.description,
      date: new Date(taskFormInput.date),
      // date: Timestamp.fromDate(new Date(taskFormInput.date)),
      priority: taskFormInput.priority,
      assigned: taskFormInput.assigned,
      category: taskFormInput.category,
      subtasks: taskFormInput.subtasks,
      status: this.tasksService.taskStatus,
    };
  }

  toggleAssignedDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
  }

  closeAssignedDropdown() {
    //verzögert, damit Checkbox-Klicks noch erkannt werden
    setTimeout(() => {
      this.dropdownOpened = false;
    }, 150);
  }

  contactIsSelected(contact: Contact) {
    return this.tasksService.assignedContacts.some(c => c.id === contact.id);
  }
  
  toggleContactSelection(event: Event, contact: Contact) {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;
    if (checked) {
      this.tasksService.assignedContacts.push({
        id: contact.id,
        name: contact.name,
        color: contact.color
      });
    } else {
      this.tasksService.assignedContacts = this.tasksService.assignedContacts.filter( c => c.id !== contact.id);
    }
  }

  toggleCategoryOpenClose() {
    this.selectOpened = !this.selectOpened;
  }

  setFocusOnSubtaskInput() {
    this.subtasks?.nativeElement.focus();
    this.addingSubtask();
  }

  addingSubtask() {
    this.subtaskBeingAdded = true;
  }

  stopAddingSubtask() {
    this.subtaskBeingAdded = false;
    this.newSubtask.text = '';
  }

  addSubtask() {
    if (this.newSubtask.text !== '' && !this.checkIfSubtaskPresent(this.newSubtask.text)) {
      this.newSubtasks.push({ ...this.newSubtask });
      this.newSubtask.text = '';
      this.subtaskBeingAdded = false;
    }
  }

  checkIfSubtaskPresent(newSubtask: string) {
    return this.newSubtasks.some(entry => entry.text === newSubtask);
  }

  editSubtask(subtask: string) {
    this.deleteSubtask(subtask);
    this.setFocusOnSubtaskInput();
    this.newSubtask.text = subtask;
  }

  deleteSubtask(subtask: string) {
    this.newSubtasks = this.newSubtasks.filter(entry => entry.text !== subtask );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.tasksService.newTask = {
      title: '',
      description: '',
      date: new Date(),
      priority: '',
      assigned: [],
      category: '',
      subtasks: [],
    };
    this.tasksService.selectedPriority = '';
    this.tasksService.assignedContacts = [];
    this.newSubtasks = [];
    this.tasksService.addTaskContainerOpened = false;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    this.tasksService.newTask.priority = this.tasksService.selectedPriority;
    this.tasksService.newTask.assigned = this.tasksService.assignedContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      color: contact.color
    })); 
    this.tasksService.newTask.category = this.selectedCategory;
    this.tasksService.newTask.subtasks = [...this.newSubtasks];
    const taskToSave = this.convertFormToTask(this.tasksService.newTask);
    try {      
      await this.dataBaseService.addData<Task>('tasks', taskToSave); // 'tasks' als Sammlungsname
      this.resetForm(form);
      this.taskAdded = true;
      this.tasksService.taskStatus = 'to-do';
      setTimeout(() => {
        this.taskAdded = false;
        this.tasksService.addTaskContainerOpened = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Tasks: ', error);
    }
    // finally {
    // }
  }

}
