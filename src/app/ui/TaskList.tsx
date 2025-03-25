import { KeyboardEvent, useReducer, useState } from "react";
import { initialTasks } from "@/app/data";
import { Task } from "@/app/types";
import AddTask from "@/app/ui/AddTask";
import TaskItem from "@/app/ui/TaskItem";
import { taskReducer } from "@/app/taskReducer";
import clsx from "clsx";

let nextTaskId = 4;

export default function TaskList() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const handleActiveTask = (taskId: number) => {
    setActiveTaskId(taskId);
  };

  const handleOnAdd = (content: string) => {
    dispatch({
      type: "ADDED",
      id: nextTaskId++,
      content: content,
    });
  };

  const handleOnComplete = (taskId: number, isCompletedValue: boolean) => {
    setActiveTaskId(taskId);
    dispatch({
      type: "COMPLETED_TOGGLED",
      id: taskId,
      isCompleted: isCompletedValue,
    });
  };

  const handleOnDelete = (taskId: number) => {
    setActiveTaskId(taskId);
    dispatch({
      type: "DELETED",
      id: taskId,
    });
  };

  const handleOnContentChange = (updatedTask: Task) => {
    setActiveTaskId(updatedTask.id);
    dispatch({
      type: "UPDATED",
      task: updatedTask,
    });
  };

  

  return (
    <ul
      className={
        "py-2 grid grid-cols-1 gap-2 tracking-[.00625em] text-[1rem] font-normal leading-[2rem] w-full"
      }
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setActiveTaskId(-10);
        }
      }}
    >
      {tasks.map((task) => (
        <li
          key={task.id}
          className={clsx("group grid grid-cols-[24px_1fr_32px] w-full px-4", {
            "border-light-gray border-t-1 border-b-1": task.id === activeTaskId,
          })}
        >
          <TaskItem
            task={task}
            onContentChange={handleOnContentChange}
            onCompleteTask={handleOnComplete}
            onDeleteTask={handleOnDelete}
            onActiveTask={handleActiveTask}
          />
        </li>
      ))}

      <li
        key="-1"
        className={clsx("grid grid-cols-[24px_1fr_32px] w-full px-4", {
          "border-light-gray border-t-1 border-b-1": -1 === activeTaskId,
        })}
      >
        <AddTask onAddTask={handleOnAdd} onActiveTask={handleActiveTask} />
      </li>
    </ul>
  );
}
