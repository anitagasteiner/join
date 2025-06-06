import { Component, inject } from '@angular/core';
import { AddTaskFormComponent } from '../../../shared/components/add-task-form/add-task-form.component';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-add-edit-task',
  imports: [
    CommonModule,
    AddTaskFormComponent
  ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
  animations: [
    /**
     * Animation trigger for sliding in the form to add or edit a task from the right.
     * Applies when the component enters the DOM.
     */
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])      
    ])
  ]
})
export class AddEditTaskComponent {

  /**
   * Instance of TasksService used to manage task data and operations.
   * @type {TasksService}
   */
  tasksService: TasksService = inject(TasksService);

}
