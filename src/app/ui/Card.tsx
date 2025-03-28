import TaskListTitle from "@/app/ui/TaskListTitle";
import TaskList from "@/app/ui/TaskList";
import { TasksProvider } from "@/app/TaskListContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Card() {
  return (
    <div
      className={
        "grid grid-cols-1 py-4 md:border-1 md:border-gray-200 md:rounded-lg md:w-[600px]"
      }
    >
      <TasksProvider>
        <TaskListTitle />
        <DndProvider backend={HTML5Backend}>
          <TaskList />
        </DndProvider>
      </TasksProvider>

      {/* <div className={"border-light-gray border-b-1"} /> */}
    </div>
  );
}
