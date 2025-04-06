export type Task = {
  position: number;
  id: number;
  content: string;
  isCompleted: boolean;
};

export const initialTask: Task = {
  position: 0,
  id: 0,
  content: "",
  isCompleted: false,
};

export type Tasks = Task[];

export type TasksDto = {
  tasks: Tasks;
  completedTasks: Tasks;
  user: User | null;
}

export const DragTypes = {
  TASK: 'task',
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


