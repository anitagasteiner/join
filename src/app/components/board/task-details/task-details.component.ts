import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from '../../../initials.pipe';
import { GeneralService } from '../../../services/general.service';

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

  constructor(public generalService: GeneralService) {}

}
