import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private currentTaskSubject = new BehaviorSubject<any>(null);
  currentTask$ = this.currentTaskSubject.asObservable();

  addTaskContainerOpened: boolean = false;
  taskDetailsOpened: boolean = false;
  taskDeleted: boolean = false;

  taskStatus: string = 'to-do';
  
  taskToBeEdited: Task | null = null;

  constructor(private dataBaseService: DataBaseService) { }

  hideTaskDetails() {
    this.taskDetailsOpened = false;
    // this.currentTask = null;
  }

  setCurrentTask(task: Task) {
    this.currentTaskSubject.next(task);
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