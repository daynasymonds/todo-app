import { useState, KeyboardEvent, ChangeEvent, useCallback } from "react";
import { initialTasks } from "@/app/data";
import { initialTask, Task, Tasks } from "@/app/types";
import AddTask from "@/app/ui/AddTask";
import TaskItem from "@/app/ui/TaskItem";
import { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { sanitizedConf } from "@/app/utils";

let nextTaskId = 4;

export default function TaskList() {
  const [tasks, setTasks] = useState<Tasks>(initialTasks);
  const [newTask, setNewTask] = useState(initialTask);

  const handleOnEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const taskToAdd = { ...newTask };
      setTasks([...tasks, { ...taskToAdd, id: nextTaskId++ }]);
      setNewTask({
        ...newTask,
        content: "",
      });
      console.log("handleOnEnterPress", tasks);
    }
  };

  const handleOnAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({
      ...newTask,
      content: e.currentTarget.value,
    });
    console.log("handleOnAdd", tasks);
  };

  const handleOnComplete = (task: Task) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, isCompleted: !task.isCompleted };
        }
        return t;
      })
    );
  };

  const handleContentChange = (task: Task) => {
    const useCustomCallbackFn = () =>
      useCallback((e: ContentEditableEvent) => {
        const updatedTask = {
          ...task,
          content: sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf),
        };

        setTasks(
          tasks.map((t) => {
            if (t.id === task.id) {
              return updatedTask;
            }
            return t;
          })
        );
      }, []);
      console.log("handleContentChange", tasks);
    return useCustomCallbackFn;
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onContentChange={handleContentChange(task)}
            onCompleteTask={() => handleOnComplete(task)}
          />

          <button
            onClick={() => {
              setTasks(tasks.filter((t) => t.id !== task.id));
            }}
          >
            x
          </button>
        </li>
      ))}

      <li key="newTask">
        <AddTask
          task={newTask}
          onAddTask={handleOnAdd}
          onEnterKeyPress={handleOnEnterPress}
        />
      </li>
    </ul>
  );
}
