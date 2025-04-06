import { useState, useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { sanitizedConf } from "@/src/app/lib/utils";

export default function CardTitle() {
  const [cardTitle, setCardTitle] = useState("Groceries");

  const handleTitleChange = useCallback((e: ContentEditableEvent) => {
    setCardTitle(sanitizeHtml(e.currentTarget.innerHTML, sanitizedConf));
  }, []);

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
