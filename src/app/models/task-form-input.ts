export interface TaskFormInput {
    title: string;
    description: string;
    date: string;
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
  }