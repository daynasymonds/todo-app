import { TasksProvider } from "@/app/TaskListContext";
import TaskContainer from "@/app/ui/task/TaskContainer";
import { emptyTasksDto, TasksDto } from "@/app/lib/types";
import { getTaskData } from "@/app/lib/actions";
import { Suspense } from "react";
import { auth } from "@/auth";

export default async function Panel({}) {
  const session = await auth();
  const userId = session?.user?.id ?? "";
  
  if (!userId) {
    return <TaskContainerWrapper key={"signedOut"} tasksDto={emptyTasksDto} />;
  }

  const dto = await getTaskData(userId);
  return <TaskContainerWrapper key={"signedIn"} tasksDto={dto} />;
}

function TaskContainerWrapper({ tasksDto }: { tasksDto: TasksDto }) {
  return (
    <Suspense fallback={<TaskPanelLoading />}>
      <TasksProvider initialDto={tasksDto}>
        <TaskContainer />
      </TasksProvider>
    </Suspense>
  );
}

function TaskPanelLoading() {
  return (
    <div className="grid grid-cols-1 py-4 text-left border-1 border-gray-200 rounded-lg w-[600px] shadow-md">
      <h2 className="text-xl font-bold pl-4 pb-4">Loading ...</h2>
    </div>
  );
}
