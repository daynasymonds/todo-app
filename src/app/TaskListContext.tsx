import { createContext, useReducer, ReactNode, ActionDispatch } from "react";
import { Task, Tasks } from "./types";
import { initialTasks } from "@/app/data";

interface TaskAction {
  type: string;
}

interface AddTaskAction extends TaskAction {
  type: "ADDED";
  id: number;
  content: string;
}

interface CompletedToggledAction extends TaskAction {
  type: "COMPLETED_TOGGLED";
  id: number;
  isCompleted: boolean;
}

interface DeletedTaskAction extends TaskAction {
  type: "DELETED";
  id: number;
}

interface UpdatedTaskAction extends TaskAction {
  type: "UPDATED";
  task: Task;
}

interface Props {
  children?: ReactNode;
}

export const TasksContext = createContext<Tasks>([] as Tasks);
export const TasksDispatchContext = createContext<
  ActionDispatch<
    [
      action:
        | TaskAction
        | UpdatedTaskAction
        | DeletedTaskAction
        | CompletedToggledAction
        | AddTaskAction
    ]
  >
>(
  {} as ActionDispatch<
    [
      action:
        | TaskAction
        | UpdatedTaskAction
        | DeletedTaskAction
        | CompletedToggledAction
        | AddTaskAction
    ]
  >
);

export function TasksProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function taskReducer(
  tasks: Tasks,
  action:
    | TaskAction
    | AddTaskAction
    | CompletedToggledAction
    | DeletedTaskAction
    | UpdatedTaskAction
): Tasks {
  switch (action.type) {
    case "ADDED":
      const addedAction = action as AddTaskAction;
      return [
        ...tasks,
        {
          id: addedAction.id,
          content: addedAction.content,
          isCompleted: false,
        },
      ];
    case "COMPLETED_TOGGLED":
      const completedAction = action as CompletedToggledAction;
      return tasks.map((task) => {
        if (task.id === completedAction.id) {
          return { ...task, isCompleted: completedAction.isCompleted };
        }
        return task;
      });
    case "DELETED":
      const deletedAction = action as DeletedTaskAction;
      return tasks.filter((task) => task.id !== deletedAction.id);
    case "UPDATED":
      const updatedAction = action as UpdatedTaskAction;
      return tasks.map((task) => {
        if (task.id === updatedAction.task.id) {
          return updatedAction.task;
        }
        return task;
      });
    default:
      throw new Error("Invalid action: " + action.type);
  }
}
