"use client";

import { useCallback, useContext } from "react";
import AddTask from "@/app/ui/task/AddTask";
import TaskListItem from "@/app/ui/task/TaskListItem";
import { Task, Tasks } from "@/app/lib/types";
import clsx from "clsx";
import { ActiveTaskContext, TasksDispatchContext } from "@/app/TaskListContext";
import { DragTypes } from "@/app/lib/types";
import { useDrop } from "react-dnd";
import { getNextPosition, getNextTaskId } from "@/app/lib/utils";

export interface TaskListProps {
  tasks: Tasks;
}

export default function TaskList({ tasks }: TaskListProps) {
  const dispatch = useContext(TasksDispatchContext);

  const nextTaskId = getNextTaskId(tasks);
  const nextTaskPosition = getNextPosition(tasks);
  const activeTaskId = useContext(ActiveTaskContext);

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

  return drop(
    <ul
      className={
        "py-2 grid grid-cols-1 gap-2 tracking-[.00625em] text-[1rem] font-normal leading-[2rem] w-full"
      }
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
        className={clsx("grid grid-cols-1 w-full px-4 border-t-1 border-b-1", {
          "border-light-gray ": -1 === activeTaskId,
          "border-transparent": -1 !== activeTaskId,
        })}
      >
        <div
          className={
            "grid grid-cols-[24px_1fr] pl-[24px] items-center gap-2 w-full h-8"
          }
        >
          <AddTask nextTaskId={nextTaskId} nextPosition={nextTaskPosition} />
        </div>
      </li>
    </ul>
  );
}
