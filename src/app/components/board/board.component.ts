import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { Observable } from 'rxjs';
import { DataBaseService } from '../../services/data-base.service';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    TaskComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  tasks$: Observable<Task[]>;

  generalService = inject(GeneralService);
  dataBaseService = inject(DataBaseService);

  constructor() {
    this.tasks$ = this.dataBaseService.getData<Task>('tasks');
    this.generalService.activeNavBtn = 'board';
  }

}
