import { useState, useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { sanitizedConf } from "@/app/utils";

export default function CardTitle() {
  const [cardTitle, setCardTitle] = useState("Groceries");

  const handleTitleChange = useCallback((e: ContentEditableEvent) => {
    setCardTitle(sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf));
  }, []);

  return (
    <ContentEditable
      onChange={handleTitleChange}
      onBlur={handleTitleChange}
      html={cardTitle}
    />
  );
}
