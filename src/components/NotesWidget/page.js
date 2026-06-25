"use client";

import { useEffect, useRef } from "react";
import useNotesStore from "@/store/useNotesStore";

export default function NotesWidget() {
  const notes = useNotesStore((state) => state.notes);
  const setNotes = useNotesStore((state) => state.setNotes);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop =
        textareaRef.current.scrollHeight;
    }
  }, [notes]);

    return (
    <div className="w-full max-w-[350px] h-[380px] bg-[#F1C75B] rounded-3xl p-6 flex flex-col overflow-hidden">
      <h1 className="text-[#000000] text-4xl font-bold mb-5">
        All notes
      </h1>

      <textarea
        ref={textareaRef}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="flex-1 bg-transparent outline-none resize-none text-[#000000] text-lg leading-8 overflow-y-auto break-words"
      />
    </div>
  );
}
