import { createContext, useReducer, ReactNode, ActionDispatch } from "react";
import { Task, Tasks } from "./types";
import { initialTasks } from "@/app/data";

const NO_ACTIVE_TASK_ID = -100;

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

interface MoveTaskAction extends TaskAction {
  type: "MOVED";
  index: number;
  to: number;
  task: Task;
}

interface RemovedActiveTaskAction extends TaskAction {
  type: "REMOVED_ACTIVE_TASK";
}

interface SetActiveTaskAction extends TaskAction {
  type: "SET_ACTIVE_TASK";
  taskId: number;
}

interface Props {
  children?: ReactNode;
}

export const TasksContext = createContext<Tasks>([] as Tasks);
export const ActiveTaskContext = createContext<number | null>(null);
export const ActiveTaskDispatchContext = createContext<
  ActionDispatch<
    [action: TaskAction | SetActiveTaskAction | RemovedActiveTaskAction]
  >
>(
  {} as ActionDispatch<
    [action: TaskAction | SetActiveTaskAction | RemovedActiveTaskAction]
  >
);
export const TasksDispatchContext = createContext<
  ActionDispatch<
    [
      action:
        | TaskAction
        | UpdatedTaskAction
        | DeletedTaskAction
        | CompletedToggledAction
        | AddTaskAction
        | MoveTaskAction
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
        | MoveTaskAction
    ]
  >
);

export function TasksProvider({ children }: Props) {
  const [activeTaskId, dispatchActiveTask] = useReducer(
    activeTaskReducer,
    null
  );
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <ActiveTaskContext.Provider value={activeTaskId}>
        <ActiveTaskDispatchContext.Provider value={dispatchActiveTask}>
          <TasksDispatchContext.Provider value={dispatch}>
            {children}
          </TasksDispatchContext.Provider>
        </ActiveTaskDispatchContext.Provider>
      </ActiveTaskContext.Provider>
    </TasksContext.Provider>
  );
}

export function activeTaskReducer(
  taskId: number | null,
  action: TaskAction | SetActiveTaskAction | RemovedActiveTaskAction
) {
  switch (action.type) {
    case "SET_ACTIVE_TASK":
      const setAction = action as SetActiveTaskAction;
      return setAction.taskId;
    case "REMOVED_ACTIVE_TASK":
      return NO_ACTIVE_TASK_ID;
    default:
      throw new Error("Invalid action: " + action.type);
  }
}

export function taskReducer(
  tasks: Tasks,
  action:
    | TaskAction
    | AddTaskAction
    | CompletedToggledAction
    | DeletedTaskAction
    | UpdatedTaskAction
    | MoveTaskAction
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
    case "MOVED":
      const movedAction = action as MoveTaskAction;
      const newTasks = tasks.filter((task) => task.id !== movedAction.task.id);
      return [
        ...newTasks.slice(0, movedAction.to),
        { ...movedAction.task },
        ...newTasks.slice(movedAction.to),
      ];

    default:
      throw new Error("Invalid action: " + action.type);
  }
}
