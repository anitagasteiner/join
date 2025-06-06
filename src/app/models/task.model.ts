export interface Task {
    id: string;
    title: string;
    description: string;
    date: Date;
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
    status: string;
  }