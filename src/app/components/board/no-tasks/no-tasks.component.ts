import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-tasks',
  imports: [],
  templateUrl: './no-tasks.component.html',
  styleUrl: './no-tasks.component.scss'
})
export class NoTasksComponent {

  /**
   * Optional input representing the task's status category 'to-do', 'in-progress', 'waiting' or 'done'.
   * @type {string}
   */
   @Input()status?: string;

}