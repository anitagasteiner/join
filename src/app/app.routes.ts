import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


export const routes: Routes = [
    { path: '', component: SummaryComponent },
    { path: 'add-task', component: AddTaskComponent }
];
