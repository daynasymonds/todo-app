import { Task } from "./types";

export const stubbedTasks: Task[] = [
    {id: "1", title: "do groceries", description:"a description"} as Task,
    {id: "2", title: "get prescriptions", description:"a description", deadline: new Date("2025-07-21 10:30:45")} as Task,
    {id: "3", title: "get project done", description:"a description", deadline: new Date("2025-07-22 10:30:45")} as Task
];

export const nextTaskId = 4;