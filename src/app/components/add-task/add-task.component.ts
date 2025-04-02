import { Component, inject } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  generalService = inject(GeneralService);

  constructor() {
    this.generalService.activeNavBtn = 'add-task';
  }

}
