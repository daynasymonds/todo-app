import { Task } from "@/app/types";
import { useCallback, useContext } from "react";
import sanitizeHtml from "sanitize-html";
import { sanitizedConf } from "@/app/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import Image from "next/image";
import { TasksDispatchContext } from "@/app/TaskListContext";

interface TaskProps {
  task: Task;
  onActiveTask: (taskId: number) => void;
}

export default function Task({ task, onActiveTask }: TaskProps) {
  const dispatch = useContext(TasksDispatchContext);

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
          onActiveTask(task.id);
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
        onClick={() => onActiveTask(task.id)}
      />

      <button
        className={
          "w-[26px] h-[26px] justify-self-end place-items-center hidden cursor-pointer group-hover:block hover:bg-lighter-gray hover:rounded-full"
        }
        onClick={() => {
          onActiveTask(task.id);
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
