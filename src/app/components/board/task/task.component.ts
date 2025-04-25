import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from './../../../models/task.model';
import { InitialsPipe } from '../../../initials.pipe';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    InitialsPipe
  ],
  templateUrl: './task.component.html',
  styleUrls: [
    './task.component.scss',
    './../task-general.scss'
  ]
})
export class TaskComponent {

  @Input()task?: Task; //Das Fragezeichen macht das Property optional, die Komponente benötigt beim Start also nicht zwingend einen Wert für task. In Kombination mit @if (task) in der HTML-Datei wird verhindert, dass die Komponente versucht auf contact zuzugreifen, wenn es noch gar nicht gesetzt wurde.

  // generalService = Inject(GeneralService);

  subtasksDone: string = '0';

  constructor(public generalService: GeneralService) {}

  get progress(): number {
    const total = this.task?.subtasks.length ?? 0;
    const completed = this.task?.subtasks.filter(subtask => subtask.done).length ?? 0;
    this.subtasksDone = `${completed}`;
    return total > 0 ? (completed / total) * 100 : 0;    
  }

}
