import { Timestamp } from '@angular/fire/firestore';

export interface Task {
    id: string;
    title: string;
    description: string;
    date: Timestamp | null;
    priority: string;
    assigned: {
      id: string;
      name: string;
      color: string;
    }[];
    category: string;
    subtasks: {
      text: string;
      done: boolean;
    }[];
    // subtasks: string[];
    status: string;
  }