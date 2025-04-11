import { Timestamp } from '@angular/fire/firestore';

export interface Task {
    id: string;
    title: string;
    description: string;
    date: Timestamp;
    priority: string;
    assigned: string[];
    category: string;
    subtasks: string[];
    status: string;
  }
  