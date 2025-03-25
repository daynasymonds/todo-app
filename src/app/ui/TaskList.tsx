import { useReducer } from "react";
import { initialTasks } from "@/app/data";
import { Task } from "@/app/types";
import AddTask from "@/app/ui/AddTask";
import TaskItem from "@/app/ui/TaskItem";
import { taskReducer } from "@/app/taskReducer";

let nextTaskId = 4;

export default function TaskList() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const handleOnAdd = (content: string) => {
    dispatch({
      type: "ADDED",
      id: nextTaskId++,
      content: content,
    });
  };

  const handleOnComplete = (taskId: number, isCompletedValue: boolean) => {
    dispatch({
      type: "COMPLETED_TOGGLED",
      id: taskId,
      isCompleted: isCompletedValue,
    });
  };

  const handleOnDelete = (taskId: number) => {
    dispatch({
      type: "DELETED",
      id: taskId,
    });
  };

  const handleOnContentChange = (updatedTask: Task) => {
    dispatch({
      type: "UPDATED",
      task: updatedTask,
    });
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onContentChange={handleOnContentChange}
            onCompleteTask={handleOnComplete}
          />

          <button
            onClick={handleOnDelete.bind(null, task.id)}
            aria-label="Delete task"
          >
            x
          </button>
        </li>
      ))}

      <li key="newTask">
        <AddTask onAddTask={handleOnAdd} />
      </li>
    </ul>
  );
}
