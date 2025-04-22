import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from './../../models/task.model';
import { DataBaseService } from '../../services/data-base.service';
import { Timestamp } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { InitialsPipe } from '../../initials.pipe';

@Component({
  selector: 'app-add-task',
  imports: [
    CommonModule,
    FormsModule,
    InitialsPipe
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent{

  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);

  contacts$: Observable<Contact[]>;

  newTask: Task = {
    id: '',
    title: '',
    description: '',
    date: Timestamp.now(),
    priority: '',
    assigned: [{
      id: '',
      name: '',
      color: ''
    }],
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

  newSubtask: string = '';

  taskAdded: boolean = false;

  constructor() {
    const originalContacts$ = this.dataBaseService.getData<Contact>('contacts');
    this.contacts$ = originalContacts$.pipe(map(contacts => contacts.sort((a, b) => a.name.localeCompare(b.name))));
    this.generalService.activeNavBtn = 'add-task';
  }

  trackByIndex(index: number): number {
    return index;
  }

  toggleDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
  }

  closeDropdown() {
    //verzögert, damit Checkbox-Klicks noch erkannt werden
    setTimeout(() => {
      this.dropdownOpened = false;
    }, 150);
  }

  isSelected(contact: Contact) {
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

  toggleOpenClose() {
    this.selectOpened = !this.selectOpened;
  }

  addSubtask() {
    if (this.newSubtask !== '') {
      this.newTask.subtasks.push(this.newSubtask);
      this.newSubtask = '';
    }
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
    this.newTask.status = 'to-do';
    try {
      console.log('Speichere Task:', this.newTask);
      await this.dataBaseService.addData<Task>('tasks', this.newTask); // 'tasks' als Sammlungsname
      form.resetForm();
      this.taskAdded = true;
      setTimeout(() => {
        this.taskAdded = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Tasks: ', error);
    }
    // finally {
    // }
  }

}
