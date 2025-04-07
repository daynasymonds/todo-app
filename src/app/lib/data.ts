import { Task, TasksDto } from "./types";

export const initialTasks: Task[] = [
  { id: 1, content: "milk", isCompleted: false, position: 0 } as Task,
  { id: 3, content: "bread", isCompleted: false, position: 1 } as Task,
  { id: 2, content: "jam", isCompleted: false, position: 2 } as Task,

  { id: 5, content: "chicken", isCompleted: true, position: 0 } as Task,
  { id: 4, content: "cookies", isCompleted: true, position: 1 } as Task,
];

export const initialTasksDto: TasksDto = {
  tasks: initialTasks.filter((task) => task.isCompleted === false),
  completedTasks: initialTasks.filter((task) => task.isCompleted === true),
  userId: null,
};
