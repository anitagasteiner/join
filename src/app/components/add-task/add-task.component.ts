import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from './../../models/task.model';
import { Timestamp } from '@angular/fire/firestore';
import { DataBaseService } from '../../services/data-base.service';

@Component({
  selector: 'app-add-task',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  newTask: Task = {
    id: '',
    title: '',
    description: '',
    date: null, //Timestamp.now()
    priority: '',
    assigned: [],
    category: '',
    subtasks: [],
    status: ''
  };  

  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);

  taskAdded: boolean = false;

  constructor() {
    this.generalService.activeNavBtn = 'add-task';
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Bitte füllen Sie alle Pflichtfelder aus.';
      return;
    }
    this.newTask.status = 'to-do';
    try {
      console.log('Speichere Task:', this.newTask);
      await this.dataBaseService.addData<Task>('tasks', this.newTask); // 'tasks' als Sammlungsname
      form.resetForm();
      this.taskAdded = true;
      setTimeout(() => {
        // this.generalService.hideContactForm();
        this.taskAdded = false;
      }, 1000);
    } catch (error: any) {
      console.error('Fehler beim Speichern des Tasks: ', error);
    }
    // finally {
    // }
  }

}
