import { useState, KeyboardEvent } from "react";

interface AddTaskProps {
  onAddTask: (content: string) => void;
  onActiveTask: (taskId: number) => void;
}

export default function AddTask({ onAddTask, onActiveTask }: AddTaskProps) {
  const [content, setContent] = useState("");

  return (
    <>
      <label>+</label>{" "}
      <input
        id="addTask"
        type="text"
        value={content}
        onClick={() => onActiveTask(-1)}
        onFocus={() => onActiveTask(-1)}
        onChange={(e) => {
          onActiveTask(-1);
          setContent(e.currentTarget.value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter" && e.key !== "Tab") return;
          e.preventDefault();
          onAddTask(content);
          setContent("");
          onActiveTask(-10);
        }}
        placeholder="List item"
      />
    </>
  );
}
