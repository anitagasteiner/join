import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';

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

  tasks = [
    {
      id: "1",
      title: "HTML Base Template Creation",
      description: "Create reusable HTML base templates.",
      date: "",
      priority: "Medium",
      assigned: "Anita Gasteiner",
      category: "Technical Task",
      subtasks: {
        subtask1: "Create template 1.",
        subtask2: "Create template 2."
      }
    },
    {
      id: "2",
      title: "CSS Architecture Planning",
      description: "Define CSS naming conventions and structure.",
      date: "",
      priority: "Urgent",
      assigned: "Anita Gasteiner",
      category: "Technical Task",
      subtasks: {
        subtask1: "Define CSS naming conventions.",
        subtask2: "Define CSS structure."
      }
    }
  ];

}
