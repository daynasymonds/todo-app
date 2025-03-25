export type Task = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export const initialTask: Task = {
  id: 0,
  content: "",
  isCompleted: false,
};

export type Tasks = Task[];


