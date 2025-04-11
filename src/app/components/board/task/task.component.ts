import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from './../../../models/task.model';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input()task?: Task; //Das Fragezeichen macht das Property optional, die Komponente benötigt beim Start also nicht zwingend einen Wert für task. In Kombination mit @if (task) in der HTML-Datei wird verhindert, dass die Komponente versucht auf contact zuzugreifen, wenn es noch gar nicht gesetzt wurde.

  // @Input()task = {
  //   title: "HTML Base Template Creation",
  //   description: "Create reusable HTML base templates.",
  //   date: "",
  //   priority: "Medium",
  //   assigned: "Anita Gasteiner",
  //   category: "Technical Task",
  //   status: "to-do",
  //   subtasks: {
  //     subtask1: "Create template 1.",
  //     subtask2: "Create template 2."
  //   }
  // };

}
