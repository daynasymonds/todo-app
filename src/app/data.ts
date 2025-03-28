import { Task } from "./types";

export const initialTasks: Task[] = [
  { id: 1, content: "milk", isCompleted: false } as Task,
  { id: 2, content: "jam", isCompleted: false } as Task,
  { id: 3, content: "bread", isCompleted: false } as Task,
  { id: 4, content: "cookies", isCompleted: true } as Task,
  { id: 5, content: "chicken", isCompleted: true } as Task,
];
