import { KeyboardEvent, useState, useCallback, useContext } from "react";
import AddTask from "@/app/ui/AddTask";
import TaskListItem from "@/app/ui/TaskListItem";
import { Task } from "@/app/types";
import clsx from "clsx";
import {
  ActiveTaskContext,
  ActiveTaskDispatchContext,
  TasksContext,
  TasksDispatchContext,
} from "@/app/TaskListContext";
import { DragTypes } from "@/app/types";
import { useDrop } from "react-dnd";

export default function TaskList() {
  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  const activeTaskId = useContext(ActiveTaskContext);
  const activeTaskDispatch = useContext(ActiveTaskDispatchContext);

  const findTaskItem = useCallback(
    (id: number) => {
      const task = tasks.find((task) => task.id === id) as Task;
      return {
        task,
        index: tasks.indexOf(task),
      };
    },
    [tasks]
  );

  const moveTaskItem = useCallback(
    (id: number, to: number) => {
      const { task, index } = findTaskItem(id);
      dispatch({
        type: "MOVED",
        index: index,
        to: to,
        task: task,
      });
    },
    [dispatch, findTaskItem]
  );

  const [, drop] = useDrop(() => ({ accept: DragTypes.TASK }));

  return (
    <ul
      ref={drop}
      className={
        "py-2 grid grid-cols-1 gap-2 tracking-[.00625em] text-[1rem] font-normal leading-[2rem] w-full"
      }
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          activeTaskDispatch({
            type: "REMOVED_ACTIVE_TASK",
          });
        }
      }}
    >
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          moveTaskItem={moveTaskItem}
          findTaskItem={findTaskItem}
        />
      ))}

      <li
        key="-1"
        className={clsx(
          "grid grid-cols-[24px_1fr_32px] w-full px-4 border-t-1 border-b-1",
          {
            "border-light-gray ": -1 === activeTaskId,
            "border-transparent": -1 !== activeTaskId,
          }
        )}
      >
        <AddTask />
      </li>
    </ul>
  );
}
