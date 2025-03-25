import { useState, KeyboardEvent } from "react";

interface AddTaskProps {
  onAddTask: (content: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [content, setContent] = useState("");

  return (
    <>
      <label>+</label>{" "}
      <input
        id="addTask"
        type="text"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter") return;

          e.preventDefault();

          setContent("");
          onAddTask(content);
        }}
        placeholder="List item"
      />
    </>
  );
}
