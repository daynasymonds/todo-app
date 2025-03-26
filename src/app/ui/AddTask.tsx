import { useState, useContext, KeyboardEvent } from "react";
import { TasksDispatchContext } from "@/app/TaskListContext";

interface AddTaskProps {
  onActiveTask: (taskId: number) => void;
}

let nextTaskId = 4;

export default function AddTask({ onActiveTask }: AddTaskProps) {
  const [content, setContent] = useState("");
  const dispatch  = useContext(TasksDispatchContext);

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
          dispatch({
            type: "ADDED",
            id: nextTaskId++,
            content: content,
          });
          setContent("");
          onActiveTask(-10);
        }}
        placeholder="List item"
      />
    </>
  );
}
