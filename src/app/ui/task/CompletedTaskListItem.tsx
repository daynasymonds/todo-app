import { ActiveTaskContext } from "@/app/TaskListContext";
import { Task } from "@/src/app/lib/types";
import TaskComponent from "@/src/app/ui/task/Task";
import clsx from "clsx";
import { useContext } from "react";

interface CompletedTaskListItemProps {
  task: Task;
}

export default function CompletedTaskListItem({
  task,
}: CompletedTaskListItemProps) {
  const activeTaskId = useContext(ActiveTaskContext);

  return (
    <li
      key={task.id}
      className={clsx(
        "group grid grid-cols-1 items-center w-full pl-[40px] pr-4 border-t-1 border-b-1 ",
        {
          "border-light-gray": task.id === activeTaskId,
          "border-transparent": task.id !== activeTaskId,
        }
      )}
    >
      <TaskComponent task={task} />
    </li>
  );
}
