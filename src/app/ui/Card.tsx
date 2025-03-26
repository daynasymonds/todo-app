import TaskListTitle from "@/app/ui/TaskListTitle";
import TaskList from "@/app/ui/TaskList";
import { TasksProvider } from "@/app/TaskListContext";

export default function Card() {
  return (
    <div
      className={
        "grid grid-cols-1 py-4 md:border-1 md:border-gray-200 md:rounded-lg md:w-[600px]"
      }
    >
      <TasksProvider>
        <TaskListTitle />
        <TaskList />
      </TasksProvider>
      {/* <div className={"border-light-gray border-b-1"} /> */}
    </div>
  );
}
