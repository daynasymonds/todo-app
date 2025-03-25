import { Task } from "@/app/types";
import { useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import { sanitizedConf } from "@/app/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TaskProps {
  task: Task;
  onContentChange: (task: Task) => void;
  onCompleteTask: (taskId: number, isCompleted: boolean) => void;
}

export default function TaskItem({
  task,
  onContentChange,
  onCompleteTask,
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
        type="checkbox"
        id={"completeTask" + task.id}
        checked={task.isCompleted}
        onChange={() => onCompleteTask(task.id, !task.isCompleted)}
      />
      <ContentEditable
        onChange={handleContentChange}
        onBlur={onContentChange}
        html={task.content}
      />
    </>
  );
}
