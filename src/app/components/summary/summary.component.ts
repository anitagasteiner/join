import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [
    CommonModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  tasksCount$: Observable<number>;
  todoCount$: Observable<number>;
  inProgressCount$: Observable<number>;
  waitingCount$: Observable<number>;
  doneCount$: Observable<number>;
  urgentCount$: Observable<number>;

  dataBaseService = inject(DataBaseService);

  constructor(private generalService: GeneralService) {
    const originalTasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasksCount$ = originalTasks$.pipe(
      map(tasks => tasks.length)
    );
    this.todoCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'to-do').length)
    )
    this.inProgressCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'in-progress').length)
    )
    this.waitingCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'waiting').length)
    )
    this.doneCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'done').length)
    )
    this.urgentCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === 'urgent').length)
    )
    this.generalService.activeNavBtn = 'summary';
  }

  chooseGreeting() {
    let d = new Date();
    let h = d.getHours();
    if (h >= 4 && h < 10) {
        return 'Good morning';
    } else if ((h < 4) || (h >= 10 && h < 13)) {
        return  'Hello';
    } else if (h >= 13 && h < 17) {
        return 'Good afternoon';
    } else if (h >= 17) {
        return 'Good evening';
    } else {
      return 'Hello';
    }
  }

}
