import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotesStore = create(
  persist(
    (set) => ({
      notes: "",

      setNotes: (notes) =>
        set({
          notes,
        }),
    }),
    {
      name: "notes-storage",
    }
  )
);

export default useNotesStore;