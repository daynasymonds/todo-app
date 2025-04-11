"use client";

import { useState } from "react";
import CompletedTaskListItem from "@/app/ui/task/CompletedTaskListItem";
import Image from "next/image";
import clsx from "clsx";
import { Tasks } from "@/src/app/lib/types";

interface CompletedTaskListProps {
  tasks: Tasks;
}
export default function CompletedTaskList({ tasks }: CompletedTaskListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        className={
          "cursor-pointer border-t-light-gray border-t-[1px] pb-2 mx-4"
        }
      ></div>
      <div
        className={
          "grid grid-cols-[24px_1fr] gap-2 pl-[40px] items-center text-l cursor-pointer"
        }
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Image
          className={clsx("", {
            "rotate-90": isExpanded === true,
          })}
          src="./expand.svg"
          width="18"
          height="18"
          alt="Expland completed items"
        />
        <div>{tasks.length} Completed items</div>
      </div>
      {isExpanded && (
        <ul
          className={
            "py-2 grid grid-cols-1 gap-2 tracking-[.00625em] text-[1rem] font-normal leading-[2rem] w-full"
          }
        >
          {tasks.map((task) => (
            <CompletedTaskListItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
