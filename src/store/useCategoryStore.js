"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "category-storage",
    }
  )
);

export default useCategoryStore;
