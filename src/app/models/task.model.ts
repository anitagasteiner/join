import { Timestamp } from '@angular/fire/firestore';

export interface Task {
    id: string;
    title: string;
    description: string;
    date: Timestamp | null;
    priority: string;
    assigned: {
      id: string;
      name: string
    }[];
    // assigned: string[];
    category: string;
    subtasks: string[];
    status: string;
  }