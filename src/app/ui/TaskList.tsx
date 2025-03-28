import { useCallback, useContext } from "react";
import AddTask from "@/app/ui/AddTask";
import TaskListItem from "@/app/ui/TaskListItem";
import { Task } from "@/app/types";
import clsx from "clsx";
import {
  ActiveTaskContext,
  TasksContext,
  TasksDispatchContext,
} from "@/app/TaskListContext";
import { DragTypes } from "@/app/types";
import { useDrop } from "react-dnd";

export default function TaskList() {
  const allTasks = useContext(TasksContext);
  const tasks = allTasks.filter((task) => task.isCompleted === false);
  const dispatch = useContext(TasksDispatchContext);

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

  return (
    <ul
      ref={drop}
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
            "grid grid-cols-[24px_1fr] pl-[20px] items-center gap-2 w-full h-8"
          }
        >
          <AddTask />
        </div>
      </li>
    </ul>
  );
}
