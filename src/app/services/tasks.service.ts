import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { DataBaseService } from './data-base.service';
import { TaskFormInput } from '../models/task-form-input';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private currentTaskSubject = new BehaviorSubject<any>(null);
  currentTask$ = this.currentTaskSubject.asObservable();

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

  selectedPriority: string = '';
  assignedContacts: {id: string; name: string, color: string}[] = [];
  selectedCategory: string = '';
  newSubtasks: {text: string; done: boolean}[] = [];

  addTaskContainerOpened: boolean = false;
  editTaskContainerOpened: boolean = false;
  taskDetailsOpened: boolean = false;
  taskDeleted: boolean = false;

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
    const confirmed = confirm(`Delete task "${task.title}"?`);
    if (!confirmed) {
      return;
    }
    try {
      await this.dataBaseService.deleteData('tasks', task.id);
      this.taskDeleted = true;
      setTimeout(() => {
        this.hideTaskDetails();
        this.taskDeleted = false;
      }, 1000);
      console.log('Task gelöscht:', task);
    } catch (error) {
      console.error('Fehler beim Löschen des Tasks:', error);
    }
  }

}