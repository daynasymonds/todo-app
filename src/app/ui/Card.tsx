import { TasksProvider } from "@/app/TaskListContext";
import TaskContainer from "@/app/ui/TaskContainer";

export default function Card() {
  return (
    <TasksProvider>
      <TaskContainer />
    </TasksProvider>
  );
}
