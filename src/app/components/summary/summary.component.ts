import { Component, inject } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

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
    /**
     * Animation trigger for sliding in the summary panel from the bottom.
     */
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])      
    ])
  ]
})
export class SummaryComponent {

  /**
   * Instance of DataBaseService used to retrieve and manage data from the Firebase database.
   * @private
   * @type {DataBaseService}
   */
  private dataBaseService: DataBaseService = inject(DataBaseService);

  /**
   * Observable stream of all tasks.
   * @type {Observable<Task[]>}
   */
  tasks$: Observable<Task[]>;

  /**
   * Total number of tasks.
   * @type {Observable<number>}
   */
  tasksCount$: Observable<number>;

  /**
   * Number of tasks with status 'to-do'.
   * @type {Observable<number>}
   */
  todoCount$: Observable<number>;

  /**
   * Number of tasks with status 'in-progress'.
   * @type {Observable<number>}
   */
  inProgressCount$: Observable<number>;

  /**
   * Number of tasks with status 'waiting'.
   * @type {Observable<number>}
   */
  waitingCount$: Observable<number>;

  /**
   * Number of tasks with status 'done'.
   * @type {Observable<number>}
   */
  doneCount$: Observable<number>;

  /**
   * Number of tasks with priority 'urgent'.
   * @type {Observable<number>}
   */
  urgentCount$: Observable<number>;

  /**
   * List of urgent tasks.
   * @type {Observable<Task[]>}
   */
  urgentTasks$: Observable<Task[]>;

  /**
   * Date of the next upcoming urgent task deadline.
   * @type {Observable<Date | null>}
   */
  upcomingUrgentDeadline$: Observable<Date | null>;

  /**
   * Creates an instance of SummaryComponent.
   * Initializes the tasks streams of all tasks and of urgent tasks.
   * Initializes streams to count all tasks, to count the tasks by their different statuses, and to count the urgent tasks.
   * Initializes stream to get the next upcoming urgent deadline.
   * Sets the currently active navigation button in the general service to 'summary'. This is used to highlight the navigation button that corresponds to the currently opened section.
   * @param {GeneralService} generalService - Service used to interact with general data and operations.
   */
  constructor(private generalService: GeneralService) {
    this.tasks$ = this.dataBaseService.getData<Task>('tasks');
    this.tasksCount$ = this.countTasks();
    this.todoCount$ = this.countTasksByStatus('to-do');
    this.inProgressCount$ = this.countTasksByStatus('in-progress');
    this.waitingCount$ = this.countTasksByStatus('waiting');
    this.doneCount$ = this.countTasksByStatus('done');
    this.urgentCount$ = this.countUrgentTasks();
    this.urgentTasks$ = this.getUrgentTasks();
    this.upcomingUrgentDeadline$ = this.getUpcomingUrgentDeadline(this.urgentTasks$);
    this.generalService.activeNavBtn = 'summary';
  }

  /**
   * Returns an appropriate greeting string based on the current time of day.
   * @returns {string} Greeting message
   */
  chooseGreeting(): string {
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

  /**
   * Counts the total number of tasks.
   * @returns {Observable<number>} Observable with total task count.
   */
  countTasks(): Observable<number> {
    return this.tasks$.pipe(
      map(tasks => tasks.length)
    );
  }

  /**
   * Counts the number of tasks that match a specific status.
   * @param {string} status - The status to filter tasks by.
   * @returns {Observable<number>} Observable with the count.
   */
  countTasksByStatus(status: string): Observable<number> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status === status).length)
    );
  }

  /**
   * Filters and returns all urgent tasks.
   * @returns {Observable<Task[]>} Observable with list of urgent tasks.
   */
  getUrgentTasks(): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === 'urgent'))
    );
  }

  /**
   * Counts the number of urgent tasks.
   * @returns {Observable<number>} Observable with the count of urgent tasks.
   */
  countUrgentTasks(): Observable<number> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.priority === 'urgent').length)
    );
  }

  /**
   * Determines the earliest upcoming deadline among the urgent tasks.
   * @param {Observable<Task[]>} urgentTasks$ - Observable stream of urgent tasks.
   * @returns {Observable<Date | null>} Observable with the next deadline or null if none.
   */
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
        .sort((a, b) => a.getTime() - b.getTime()); // NOTE - früheste Deadline zuerst
        return deadlines.length ? deadlines[0] : null;
      })
    );      
  }

  /**
   * Formats a given Date object into a string in the format 'day month year', using British English locale formatting.
   * @param {Date} date - The date to be formatted.
   * @returns {string} Date string formatted in the 'en-GB' locale.
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

}