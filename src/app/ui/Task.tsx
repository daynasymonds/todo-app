import { Task } from "@/app/types";
import { useCallback, useContext } from "react";
import sanitizeHtml from "sanitize-html";
import { sanitizedConf } from "@/app/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import Image from "next/image";
import {
  TasksDispatchContext,
  ActiveTaskDispatchContext,
} from "@/app/TaskListContext";

interface TaskProps {
  task: Task;
}

export default function Task({ task }: TaskProps) {
  const dispatch = useContext(TasksDispatchContext);
  const activeTaskDispatch = useContext(ActiveTaskDispatchContext);

  const handleContentChange = useCallback(
    (e: ContentEditableEvent) => {
      const updatedTask = {
        ...task,
        content: sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf),
      };

      dispatch({
        type: "UPDATED",
        task: updatedTask,
      });
    },
    [task, dispatch]
  );

  return (
    <div className="grid grid-cols-[24px_1fr_32px] gap-2 items-center  w-full">
      <input
        className={"justify-self-start"}
        type="checkbox"
        id={"completeTask" + task.id}
        checked={task.isCompleted}
        onChange={() => {
          activeTaskDispatch({
            type: "SET_ACTIVE_TASK",
            taskId: task.id,
          });
          dispatch({
            type: "COMPLETED_TOGGLED",
            id: task.id,
            isCompleted: !task.isCompleted,
          });
        }}
      />
      <ContentEditable
        onChange={handleContentChange}
        onBlur={handleContentChange}
        html={task.content}
        onClick={() =>
          activeTaskDispatch({
            type: "SET_ACTIVE_TASK",
            taskId: task.id,
          })
        }
      />

      <button
        className={
          "w-[26px] h-[26px] justify-self-end place-items-center hidden cursor-pointer group-hover:block hover:bg-lighter-gray hover:rounded-full"
        }
        onClick={() => {
          activeTaskDispatch({
            type: "REMOVED_ACTIVE_TASK",
          });
          dispatch({
            type: "DELETED",
            id: task.id,
          });
        }}
        aria-label="Delete task"
        title="Delete"
      >
        <Image src="/delete.svg" alt="Delete task" width={18} height={18} />
      </button>
    </div>
  );
}
