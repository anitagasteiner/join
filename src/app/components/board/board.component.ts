import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../general.service';
import { Observable } from 'rxjs';
import { DataBaseService } from '../../data-base.service';

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

  tasks$: Observable<any[]>;

  // generalService = inject(GeneralService);

  constructor(
    private dataBaseService: DataBaseService,
    private generalService: GeneralService
  ) {
    this.tasks$ = this.dataBaseService.getData('tasks');
    this.generalService.activeNavBtn = 'board';
  }

}
