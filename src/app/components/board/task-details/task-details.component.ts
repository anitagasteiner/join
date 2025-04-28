import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../initials.pipe';
import { GeneralService } from '../../../services/general.service';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-details',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './task-details.component.html',
  styleUrls: [
    './task-details.component.scss',
    './../task-general.scss'
  ]
})
export class TaskDetailsComponent {

  // @Input()currentTask!: Task;
  generalService = inject(GeneralService);

  displayedTask$: Observable<Task> = this.generalService.currentTask$; // displayedTask$ wird als Observable<Task> deklariert und sofort auf den Wert des currentTask$-Streams aus dem GeneralService gesetzt

  constructor() {}

}
