import { Component, inject } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { GeneralService } from '../../general.service';

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

  generalService = inject(GeneralService);

  tasks = [
    {
      id: "1",
      title: "HTML Base Template Creation",
      description: "Create reusable HTML base templates.",
      date: "",
      priority: "Medium",
      assigned: "Anita Gasteiner",
      category: "Technical Task",
      status: "to-do",
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
      status: "in-progress",
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
      status: "to-do",
      subtasks: {
        subtask1: "Create person.",
        subtask2: "Describe person and corresponding user story."
      }
    },
    {
      id: "4",
      title: "Create Board Situations",
      description: "Create and define usage situations for board section.",
      date: "",
      priority: "Urgent",
      assigned: "Anita Gasteiner",
      category: "User Story",
      status: "waiting",
      subtasks: {
        subtask1: "Create test situations.",
        subtask2: "Describe test situations."
      }
    },
    {
      id: "5",
      title: "Create Summary Situations",
      description: "Create and define usage situations for summary section.",
      date: "",
      priority: "Low",
      assigned: "Anita Gasteiner",
      category: "User Story",
      status: "waiting",
      subtasks: {
        subtask1: "Create test situations.",
        subtask2: "Describe test situations."
      }
    },
    {
      id: "6",
      title: "Create Add Task Situations",
      description: "Create and define usage situations for add task section.",
      date: "",
      priority: "Medium",
      assigned: "Anita Gasteiner",
      category: "User Story",
      status: "to-do",
      subtasks: {
        subtask1: "Create test situations.",
        subtask2: "Describe test situations."
      }
    },
    {
      id: "7",
      title: "Create Contacts Situations",
      description: "Create and define usage situations for contacts section.",
      date: "",
      priority: "Urgent",
      assigned: "Anita Gasteiner",
      category: "User Story",
      status: "done",
      subtasks: {
        subtask1: "Create test situations.",
        subtask2: "Describe test situations."
      }
    }
  ];  

  constructor() {
    this.generalService.activeNavBtn = 'board';
  }

}
