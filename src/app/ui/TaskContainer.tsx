import TaskListTitle from "@/app/ui/TaskListTitle";
import TaskList from "@/app/ui/TaskList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CompletedTaskList from "@/app/ui/CompletedTaskList";
import { useContext, KeyboardEvent } from "react";
import { ActiveTaskDispatchContext } from "@/app/TaskListContext";

export default function TaskContainer() {
  const activeTaskDispatch = useContext(ActiveTaskDispatchContext);

  const removeActiveTask = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      activeTaskDispatch({
        type: "REMOVED_ACTIVE_TASK",
      });
    }
  };
  return (
    <div
      className={
        "grid grid-cols-1 py-4 text-left border-1 border-gray-200 rounded-lg w-[600px]"
      }
      onKeyDown={removeActiveTask}
    >
      <TaskListTitle />
      <DndProvider backend={HTML5Backend}>
        <TaskList />
      </DndProvider>
      <CompletedTaskList />
    </div>
  );
}
