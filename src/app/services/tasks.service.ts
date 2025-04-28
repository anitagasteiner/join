import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private currentTaskSubject = new BehaviorSubject<any>(null);
  currentTask$ = this.currentTaskSubject.asObservable();

  addTaskContainerOpened: boolean = false;

  taskDetailsOpened: boolean = false;

  taskStatus: string = 'to-do';
  
  taskToBeEdited: Task | null = null;

  constructor() { }

  hideTaskDetails() {
    this.taskDetailsOpened = false;
    // this.currentTask = null;
  }

  setCurrentTask(task: Task) {
    this.currentTaskSubject.next(task);
  }

}