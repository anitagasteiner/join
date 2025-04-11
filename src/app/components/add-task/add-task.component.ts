import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  // generalService = inject(GeneralService);

  constructor(private generalService: GeneralService) {
    this.generalService.activeNavBtn = 'add-task';
  }

}
