export type Task = {
  position: number;
  id: number;
  content: string;
  isCompleted: boolean;
};

export type Tasks = Task[];

export type TasksDto = {
  tasks: Tasks;
  completedTasks: Tasks;
  userId: string | null;
  title: string
}

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SignupState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirm?: string[];
  };
  message?: string | null;
};

export const initialTask: Task = {
  position: 0,
  id: 0,
  content: "",
  isCompleted: false,
};


export const emptyTasksDto = {
  tasks: [{id: 1, content: "a task", isCompleted: false, position: 1}],
  completedTasks: [{id: 2, content: "a completed task", isCompleted: true, position: 2}],
  userId: null,
  title: "List title"
} as TasksDto;

export const DragTypes = {
  TASK: 'task',
}

