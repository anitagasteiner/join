import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InitialsPipe } from '../../../initials.pipe';
import { DataBaseService } from '../../../services/data-base.service';
import { GeneralService } from '../../../services/general.service';
import { Task } from '../../../models/task.model';
import { map, Observable } from 'rxjs';
import { Contact } from '../../../models/contact.model';
import { Timestamp } from '@angular/fire/firestore';

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
  
  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);

  @ViewChild('subtaskInput', { static: false }) subtasks?: ElementRef;

  contacts$: Observable<Contact[]>;

  newTask: Task = {
    id: '',
    title: '',
    description: '',
    date: Timestamp.now(),
    priority: '',
    assigned: [],
    category: '',
    subtasks: [],
    status: ''
  };

  selectedPriority: string = '';
  selectOpened: boolean = false;

  dropdownOpened: boolean = false;
  assignedContacts: {id: string; name: string, color: string}[] = [];

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

  // trackByIndex(index: number): number {
  //   return index;
  // }

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
    return this.assignedContacts.some(c => c.id === contact.id);
  }
  
  toggleContactSelection(event: Event, contact: Contact) {
    const checkbox = event.target as HTMLInputElement;
    const checked = checkbox.checked;
    if (checked) {
      this.assignedContacts.push({
        id: contact.id,
        name: contact.name,
        color: contact.color
      });
    } else {
      this.assignedContacts = this.assignedContacts.filter( c => c.id !== contact.id);
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
    this.newTask.subtasks = [];
    this.selectedPriority = '';
    this.assignedContacts = [];
    this.generalService.addTaskContainerOpened = false;
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }    
    this.newTask.priority = this.selectedPriority;
    this.newTask.assigned = this.assignedContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      color: contact.color
    })); 
    this.newTask.category = this.selectedCategory;
    this.newTask.subtasks = [...this.newSubtasks];
    this.newSubtasks = [];
    this.newTask.status = this.generalService.taskStatus;
    try {      
      await this.dataBaseService.addData<Task>('tasks', this.newTask); // 'tasks' als Sammlungsname
      form.resetForm();
      this.newTask.subtasks = [];
      this.selectedPriority = '';
      this.assignedContacts = [];
      this.taskAdded = true;
      setTimeout(() => {
        this.taskAdded = false;
        this.generalService.addTaskContainerOpened = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Tasks: ', error);
    }
    // finally {
    // }
  }

}
