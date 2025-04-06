import { TasksProvider } from "@/app/TaskListContext";
import TaskContainer from "@/app/ui/TaskContainer";
import { useSession } from "next-auth/react";


export default function Panel() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <TasksProvider userId={user?.id}>
      <TaskContainer />
    </TasksProvider>
  );
}
