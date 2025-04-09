"use client";

import { useState, useCallback, useContext } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { sanitizedConf } from "@/app/lib/utils";
import { TasksDispatchContext } from "@/app/TaskListContext";

interface CardTitleProps {
  title: string;
}

export default function CardTitle({ title }: CardTitleProps) {
  const initialTitle = title ?? "List title";
  const [cardTitle, setCardTitle] = useState(initialTitle);
  const dispatch = useContext(TasksDispatchContext);

  const handleTitleChange = useCallback(
    (e: ContentEditableEvent) => {
      setCardTitle(sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf));
      dispatch({
        type: "UPDATED_TITLE",
        title: sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf),
      });
    },
    [dispatch]
  );

  return (
    <div className="text-xl font-bold pl-4 pb-4">
      <ContentEditable
        onChange={handleTitleChange}
        onBlur={handleTitleChange}
        html={cardTitle}
      />
    </div>
  );
}
