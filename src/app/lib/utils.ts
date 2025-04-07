import { Task, Tasks } from "@/app/lib/types";

export const sanitizedConf = {
  allowedTags: ["a"],
  allowedAttributes: {
    a: ["href"],
  },
};

export function getNextPosition(tasks: Tasks): number {
  const positions = tasks.map((task: Task) => task.position);
  return Math.max(...positions, 0) + 1;
}

export function getNextTaskId(tasks: Tasks): number {
  const ids = tasks.map((task: Task) => task.id);
  return Math.max(...ids, 0) + 1;
}
