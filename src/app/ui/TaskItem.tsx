import { Task } from "@/app/types";
import { ChangeEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TaskProps {
  task: Task;
  onContentChange: (event: ContentEditableEvent) => void;
  onCompleteTask: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskItem({
  task,
  onContentChange,
  onCompleteTask,
}: TaskProps) {
  return (
    <>
      <input
        type="checkbox"
        id={"completeTask" + task.id}
        checked={task.isCompleted}
        onChange={onCompleteTask}
      />
      <ContentEditable
        onChange={onContentChange}
        onBlur={onContentChange}
        html={task.content}
      />
    </>
  );
}
