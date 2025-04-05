import { useState, useContext, KeyboardEvent } from "react";
import {
  TasksDispatchContext,
  ActiveTaskDispatchContext,
} from "@/app/TaskListContext";
import Image from "next/image";

interface AddTaskProps {
  nextTaskId: number;
  nextPosition: number;
}

export default function AddTask({nextTaskId, nextPosition}: AddTaskProps) {
  const [content, setContent] = useState("");
  const dispatch = useContext(TasksDispatchContext);
  const activeTaskDispatch = useContext(ActiveTaskDispatchContext);

  return (
    <>
      <label><Image className={"opacity-45"} src="./add.svg" width="18" height="18" alt="Add item"/></label>{" "}
      <input
        id="addTask"
        type="text"
        value={content}
        onClick={() =>
          activeTaskDispatch({ type: "SET_ACTIVE_TASK", taskId: -1 })
        }
        onFocus={() =>
          activeTaskDispatch({ type: "SET_ACTIVE_TASK", taskId: -1 })
        }
        onChange={(e) => {
          activeTaskDispatch({ type: "SET_ACTIVE_TASK", taskId: -1 });
          setContent(e.currentTarget.value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter" && e.key !== "Tab") return;
          e.preventDefault();
          dispatch({
            type: "ADDED",
            id: nextTaskId,
            content: content,
            position: nextPosition,
          });
          setContent("");
          activeTaskDispatch({ type: "REMOVED_ACTIVE_TASK" });
        }}
        placeholder="List item"
      />
    </>
  );
}
