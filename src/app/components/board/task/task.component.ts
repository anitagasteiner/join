import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input()task = {
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
  };

}
