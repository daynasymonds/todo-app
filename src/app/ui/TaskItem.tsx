import { Task } from "@/app/types";
import { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import { sanitizedConf } from "@/app/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import Image from "next/image";

interface TaskProps {
  task: Task;
  onContentChange: (task: Task) => void;
  onCompleteTask: (taskId: number, isCompleted: boolean) => void;
  onDeleteTask: (taskId: number) => void;
  onActiveTask: (taskId: number) => void;
}

export default function TaskItem({
  task,
  onContentChange,
  onCompleteTask,
  onDeleteTask,
  onActiveTask,
}: TaskProps) {
  const handleContentChange = useCallback(
    (e: ContentEditableEvent) => {
      const updatedTask = {
        ...task,
        content: sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf),
      };

      onContentChange(updatedTask);
    },
    [task, onContentChange]
  );

  return (
    <>
      <input
        className={"justify-self-start"}
        type="checkbox"
        id={"completeTask" + task.id}
        checked={task.isCompleted}
        onClick={() => onActiveTask(task.id)}
        onChange={() => onCompleteTask(task.id, !task.isCompleted)}
      />
      <ContentEditable
        onChange={handleContentChange}
        onBlur={handleContentChange}
        html={task.content}
        onClick={() => onActiveTask(task.id)}
      />

      <button
        className={"w-[26px] h-[26px] justify-self-end place-items-center hidden cursor-pointer group-hover:block hover:bg-lighter-gray hover:rounded-full"}
        onClick={() => {
          onActiveTask(task.id);
          onDeleteTask(task.id);
        }}
        aria-label="Delete task"
        title="Delete"
      >
        <Image src="/delete.svg" alt="Delete task" width={18} height={18} />
      </button>
    </>
  );
}
