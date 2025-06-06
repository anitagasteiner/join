import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from './../../../models/task.model';
import { InitialsPipe } from '../../../pipes/initials.pipe';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './task.component.html',
  styleUrls: [
    './task.component.scss',
    './../task-general.scss'
  ]
})
export class TaskComponent {

  /**
   * The Task object passed into the component.
   * This property is optional to allow safe rendering.
   */
  @Input()task?: Task; //NOTE - Das Fragezeichen macht das Property optional, die Komponente benötigt beim Start also nicht zwingend einen Wert für task. In Kombination mit @if (task) in der HTML-Datei wird verhindert, dass die Komponente versucht auf contact zuzugreifen, wenn es noch gar nicht gesetzt wurde.

  /**
   * Stores the number of completed subtasks in a string.
   * It's updated every time the 'progress' getter is called.
   * @type {string}
   */
  subtasksDone: string = '0';

  constructor() {}

  /**
   * Calculates the percentage of completed subtasks.
   * Updates the 'subtasksDone' property with the current number of completed subtasks.
   */
  get progress(): number {
    const total = this.task?.subtasks.length ?? 0;
    const completed = this.task?.subtasks.filter(subtask => subtask.done).length ?? 0;
    this.subtasksDone = `${completed}`;
    return total > 0 ? (completed / total) * 100 : 0;    
  }

}
