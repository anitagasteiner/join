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
      status: 0,
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
      status: 1,
      subtasks: {
        subtask1: "Define CSS naming conventions.",
        subtask2: "Define CSS structure."
      }
    },
    {
      id: "3",
      title: "Create Test Users",
      description: "Define test user stories.",
      date: "",
      priority: "Urgent",
      assigned: "Anita Gasteiner",
      category: "User Story",
      status: 0,
      subtasks: {
        subtask1: "Create person.",
        subtask2: "Describe person and corresponding user story."
      }
    }
  ];

}
