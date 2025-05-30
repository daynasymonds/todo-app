"use client";

import { createContext, useReducer, ReactNode, ActionDispatch } from "react";
import { Task, Tasks, TasksDto } from "@/app/lib/types";

const NO_ACTIVE_TASK_ID = -100;

interface TaskAction {
  type: string;
}

interface AddTaskAction extends TaskAction {
  type: "ADDED";
  id: number;
  content: string;
  position: number;
}

interface MarkedCompleteAction extends TaskAction {
  type: "MARKED_COMPLETE";
  id: number;
  isCompleted: boolean;
}

interface MarkedInpcompleteAction extends TaskAction {
  type: "MARKED_INCOMPLETE";
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

interface UpdatedTitleAction extends TaskAction {
  type: "UPDATED_TITLE";
  title: string;
}

interface RemovedActiveTaskAction extends TaskAction {
  type: "REMOVED_ACTIVE_TASK";
}

interface SetActiveTaskAction extends TaskAction {
  type: "SET_ACTIVE_TASK";
  taskId: number;
}

interface Props {
  initialDto: TasksDto;
  children?: ReactNode;
}

export const TasksContext = createContext<TasksDto>({} as TasksDto);
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
        | MarkedCompleteAction
        | AddTaskAction
        | MoveTaskAction
        | UpdatedTitleAction
    ]
  >
>(
  {} as ActionDispatch<
    [
      action:
        | TaskAction
        | UpdatedTaskAction
        | DeletedTaskAction
        | MarkedCompleteAction
        | AddTaskAction
        | MoveTaskAction
        | UpdatedTitleAction
    ]
  >
);

export function TasksProvider({ initialDto, children }: Props) {
  const [activeTaskId, dispatchActiveTask] = useReducer(
    activeTaskReducer,
    null
  );
  const [tasksDto, dispatch] = useReducer(taskReducer, initialDto);

  return (
    <TasksContext.Provider value={tasksDto}>
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
  tasksDto: TasksDto,
  action:
    | TaskAction
    | AddTaskAction
    | MarkedCompleteAction
    | DeletedTaskAction
    | UpdatedTaskAction
    | MoveTaskAction
): TasksDto {
  switch (action.type) {
    case "ADDED":
      const addedAction = action as AddTaskAction;
      return {
        ...tasksDto,
        tasks: sortTasksByPosition([
          ...tasksDto.tasks,
          {
            id: addedAction.id,
            content: addedAction.content,
            isCompleted: false,
            position: addedAction.position,
          },
        ]),
      };
    case "MARKED_COMPLETE":
      const completedAction = action as MarkedCompleteAction;
      const completedTask = tasksDto.tasks.find(
        (task) => task.id === completedAction.id
      ) as Task;
      return {
        ...tasksDto,
        tasks: tasksDto.tasks.filter((task) => task.id !== completedAction.id),
        completedTasks: [
          ...tasksDto.completedTasks,
          { ...completedTask, isCompleted: true },
        ],
      };
    case "MARKED_INCOMPLETE":
      const incompleteAction = action as MarkedInpcompleteAction;
      const incompleteTask = tasksDto.completedTasks.find(
        (task) => task.id === incompleteAction.id
      ) as Task;
      return {
        ...tasksDto,
        completedTasks: tasksDto.completedTasks.filter(
          (task) => task.id !== incompleteAction.id
        ),
        tasks: sortTasksByPosition([
          ...tasksDto.tasks,
          { ...incompleteTask, isCompleted: false },
        ]),
      };
    case "DELETED":
      const deletedAction = action as DeletedTaskAction;
      return {
        ...tasksDto,
        tasks: tasksDto.tasks.filter((task) => task.id !== deletedAction.id),
        completedTasks: tasksDto.completedTasks.filter(
          (task) => task.id !== deletedAction.id
        ),
      };
    case "UPDATED":
      const updatedAction = action as UpdatedTaskAction;
      return {
        ...tasksDto,
        tasks: tasksDto.tasks.map((task) => {
          if (task.id === updatedAction.task.id) {
            return updatedAction.task;
          }
          return task;
        }),
      };
    case "MOVED":
      const movedAction = action as MoveTaskAction;
      const newTasks = tasksDto.tasks.filter(
        (task) => task.id !== movedAction.task.id
      );
      return {
        ...tasksDto,
        tasks: updateTaskPositions([
          ...newTasks.slice(0, movedAction.to),
          { ...movedAction.task },
          ...newTasks.slice(movedAction.to),
        ]),
      };
    case "UPDATED_TITLE":
      const updatedTitleAction = action as UpdatedTitleAction;
      return {
        ...tasksDto,
        title: updatedTitleAction.title,
      };

    default:
      throw new Error("Invalid action: " + action.type);
  }
}

function sortTasksByPosition(tasks: Tasks): Tasks {
  return tasks.sort((a: Task, b: Task) => a.position - b.position);
}

function updateTaskPositions(tasks: Tasks): Tasks {
  return tasks.map((task, index) => ({
    ...task,
    position: index,
  }));
}
