import { Task } from "@/app/types";
import { ChangeEvent, KeyboardEvent } from "react";

interface AddTaskProps {
  task: Task;
  onAddTask: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnterKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function AddTask({
  task,
  onAddTask,
  onEnterKeyPress,
}: AddTaskProps) {
  return (
    <>
      <label>+</label>{" "}
      <input
        id="addTask"
        type="text"
        value={task.content}
        onChange={onAddTask}
        onKeyDown={onEnterKeyPress}
        placeholder="List item"
      />
    </>
  );
}
