import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { DataBaseService } from './data-base.service';
import { TaskFormInput } from '../models/task-form-input';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private currentTaskSubject = new BehaviorSubject<any>(null);
  currentTask$ = this.currentTaskSubject.asObservable();

  generalService = inject(GeneralService);

  newTask: TaskFormInput = {
    title: '',
    description: '',
    date: '',
    priority: '',
    assigned: [],
    category: '',
    subtasks: []
  };

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
  // taskToBeEdited: Task | null = null;

  taskToBeDeleted: Task | null = null;

  selectedPriority: string = '';
  assignedContacts: {id: string; name: string, color: string}[] = [];
  selectedCategory: string = '';
  newSubtasks: {text: string; done: boolean}[] = [];

  addTaskContainerOpened: boolean = false;
  editTaskContainerOpened: boolean = false;
  taskDetailsOpened: boolean = false;

  // deleteTaskConfirmed: boolean = false;

  taskStatus: string = 'to-do';

  constructor(private dataBaseService: DataBaseService) { }

  hideTaskDetails() {
    this.taskDetailsOpened = false;
    // this.currentTask = null;
  }

  setCurrentTask(task: Task) {
    this.currentTaskSubject.next(task);
  }

  async toggleSubtaskDone(task: Task, subtask: { text: string; done: boolean }) {
    const subtaskToBeEdited = task.subtasks.find(st => st.text === subtask.text);
    if (subtaskToBeEdited && subtask.done === true) {
      subtaskToBeEdited.done = false;      
    } else if (subtaskToBeEdited && subtask.done === false) {
      subtaskToBeEdited.done = true;      
    }
    await this.dataBaseService.updateData<Task>('tasks', task.id, { ...task, subtasks: task.subtasks});
  }

  async deleteTask(task: Task): Promise<void> {
    // const confirmed = confirm(`Delete task "${task.title}"?`);
    // if (!this.deleteTaskConfirmed) {
    //   return;
    // }
    try {
      await this.dataBaseService.deleteData('tasks', task.id);
      this.generalService.notificationTaskDeleted = true;
      this.hideTaskDetails();      
      setTimeout(() => {
        this.generalService.notificationTaskDeleted = false;
      }, 1000);
      this.generalService.confirmationDeleteTask = false;
      this.taskToBeDeleted = null;
    } catch (error) {
      console.error('Fehler beim Löschen des Tasks:', error);
    }
  }

}