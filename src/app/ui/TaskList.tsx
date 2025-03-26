import { KeyboardEvent, useState, useContext } from "react";
import AddTask from "@/app/ui/AddTask";
import TaskItem from "@/app/ui/TaskItem";
import clsx from "clsx";
import { TasksContext } from "@/app/TaskListContext";

export default function TaskList() {
  const tasks = useContext(TasksContext);

  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const handleActiveTask = (taskId: number) => {
    setActiveTaskId(taskId);
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
          className={clsx(
            "group grid grid-cols-[24px_1fr_32px] items-center w-full px-4 border-t-1 border-b-1",
            {
              "border-light-gray": task.id === activeTaskId,
              "border-transparent": task.id !== activeTaskId,
            }
          )}
        >
          <TaskItem task={task} onActiveTask={handleActiveTask} />
        </li>
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
        <AddTask onActiveTask={handleActiveTask} />
      </li>
    </ul>
  );
}
