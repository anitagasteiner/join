import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations'; // transition

@Component({
  selector: 'app-summary',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])      
    ])
  ]
})
export class SummaryComponent {

  private dataBaseService = inject(DataBaseService);

  tasksCount$: Observable<number>;
  todoCount$: Observable<number>;
  inProgressCount$: Observable<number>;
  waitingCount$: Observable<number>;
  doneCount$: Observable<number>;
  urgentCount$: Observable<number>;

  urgentTasks$: Observable<Task[]>;
  upcomingUrgentDeadline$: Observable<Date | null>;

  constructor(private generalService: GeneralService) {
    const originalTasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasksCount$ = originalTasks$.pipe(
      map(tasks => tasks.length)
    );
    this.todoCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'to-do').length)
    );
    this.inProgressCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'in-progress').length)
    );
    this.waitingCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'waiting').length)
    );
    this.doneCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'done').length)
    );
    this.urgentCount$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === 'urgent').length)
    );
    this.urgentTasks$ = originalTasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === 'urgent'))
    );
    this.upcomingUrgentDeadline$ = this.getUpcomingUrgentDeadline(this.urgentTasks$);
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

  getUpcomingUrgentDeadline(urgentTasks$: Observable<Task[]>): Observable<Date | null> {
    return urgentTasks$.pipe(
      map(tasks => {
        const deadlines: Date[] = tasks
        .map(task => {
          const d = task.date;
          if (d instanceof Timestamp) {
            return d.toDate();
          } else if (typeof d === 'string') {
            const parsed = new Date(d);
            return isNaN(parsed.getTime()) ? null : parsed;            
          } else if (Object.prototype.toString.call(d) === '[object Date]' && !isNaN((d as Date).getTime())) {
            return d as Date;
          } else {
            return null;
          }
        })
        .filter((d): d is Date => d !== null)
        .sort((a, b) => a.getTime() - b.getTime()); // früheste Deadline zuerst
        return deadlines.length ? deadlines[0] : null;
      })
    );      
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // getFormattedDeadline() {
  //   if (this.upcomingUrgentDeadline$ instanceof Date) {
  //     return this.upcomingUrgentDeadline$.toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'});
  //   } else {
  //     return 'failed';
  //   }
  // }

}