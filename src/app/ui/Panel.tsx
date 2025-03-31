import { TasksProvider } from "@/app/TaskListContext";
import TaskContainer from "@/app/ui/TaskContainer";

export default function Panel() {
  return (
    <TasksProvider>
      <TaskContainer />
    </TasksProvider>
  );
}
