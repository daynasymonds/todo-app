"use client";

import TaskListTitle from "@/app/ui/task/TaskListTitle";
import TaskList from "@/app/ui/task/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CompletedTaskList from "@/app/ui/task/CompletedTaskList";
import { useContext, KeyboardEvent } from "react";
import { ActiveTaskDispatchContext } from "@/app/TaskListContext";
import { useAutosave } from "react-autosave";
import { saveTaskData } from "@/app/lib/actions";
import { TasksContext } from "@/app/TaskListContext";
import { getNextPosition, getNextTaskId } from "@/src/app/lib/utils";

export default function TaskContainer() {
  const activeTaskDispatch = useContext(ActiveTaskDispatchContext);
  const allTasks = useContext(TasksContext);

  const removeActiveTask = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      activeTaskDispatch({
        type: "REMOVED_ACTIVE_TASK",
      });
    }
  };
  
  useAutosave({ data: allTasks, onSave: saveTaskData});

  const tasks = allTasks.tasks;
  const completedTasks = allTasks.completedTasks;
  const tasksList = [...tasks, ...completedTasks];
  const nextTaskId = getNextTaskId(tasksList);
  const nextTaskPosition = getNextPosition(tasksList);

  return (
    <div
      className={
        "grid grid-cols-1 py-4 text-left border-1 border-gray-200 rounded-lg w-[600px] shadow-md"
      }
      onKeyDown={removeActiveTask}
    >
      <TaskListTitle title={allTasks.title}/>
      <DndProvider backend={HTML5Backend}>
        <TaskList tasks={tasks} nextTaskId={nextTaskId} nextTaskPosition={nextTaskPosition}/>
      </DndProvider>
      <CompletedTaskList tasks={completedTasks}/>
    </div>
  );
}
