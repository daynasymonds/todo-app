"use client";

import clsx from "clsx";
import { Task } from "@/app/lib/types";
import TaskComponent from "@/app/ui/task/Task";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes } from "@/app/lib/types";
import { useContext } from "react";
import { ActiveTaskContext } from "@/app/TaskListContext";

interface TaskListItemProps {
  task: Task;
  moveTaskItem: (id: number, to: number) => void;
  findTaskItem: (id: number) => { index: number };
}

interface TaskDragItem {
  taskId: number;
  originalIndex: number;
}

export default function TaskListItem({
  task,
  moveTaskItem,
  findTaskItem,
}: TaskListItemProps) {
  const activeTaskId = useContext(ActiveTaskContext);

  const originalIndex = findTaskItem(task.id).index;
  const taskId = task.id;

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: DragTypes.TASK,
      item: { taskId, originalIndex },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {
        const { taskId: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveTaskItem(droppedId, originalIndex);
        }
      },
    }),
    [taskId, originalIndex]
  );

  const [, drop] = useDrop(
    () => ({
      accept: DragTypes.TASK,
      hover({ taskId: draggedId }: TaskDragItem) {
        if (draggedId !== taskId) {
          const { index: overIndex } = findTaskItem(taskId);
          moveTaskItem(draggedId, overIndex);
        }
      },
    }),
    [findTaskItem, moveTaskItem]
  );

  const draggableHandle = drag(
    <img
      className="md:invisible md:group-hover:visible place-items-center w-[20px] h-full group-hover:cursor-move"
      src="./drag.svg"
      alt="Move task"
      width="20"
      height="20"
    />
  );

  return preview(
    drop(
      <li
        key={task.id}
        style={{ opacity }}
        className={clsx(
          "group grid grid-cols-1 items-center w-full px-4 border-t-1 border-b-1 ",
          {
            "border-light-gray": task.id === activeTaskId,
            "border-transparent": task.id !== activeTaskId,
          }
        )}
      >
        <div className={"md:group grid grid-cols-[24px_1fr] w-full h-8 "}>
          {draggableHandle}
          <TaskComponent task={task} />
        </div>
      </li>
    )
  );
}
