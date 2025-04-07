import { TasksProvider } from "@/app/TaskListContext";
import TaskContainer from "@/app/ui/task/TaskContainer";
import { TasksDto, emptyTasksDto } from "@/app/lib/types";
import { getTaskData } from "@/app/lib/actions";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Panel() {
  const session = await auth();
  const userId = session?.user?.id;
  let tasksDto: TasksDto = emptyTasksDto;
  if (session && userId) {
    tasksDto = await getTaskData(userId);
  }

  return (
    <TasksProvider tasksDto={tasksDto}>
      <Suspense fallback={<TaskPanelLoading />}>
        <TaskContainer />
      </Suspense>
    </TasksProvider>
  );
}

function TaskPanelLoading() {
  return (
    <div className="grid grid-cols-1 py-4 text-left border-1 border-gray-200 rounded-lg w-[600px] shadow-md">
      <h2 className="text-xl font-bold pl-4 pb-4">Loading ...</h2>
    </div>
  );
}
