import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';


export const routes: Routes = [
    { path: '', component: SummaryComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'board', component: BoardComponent }
];
