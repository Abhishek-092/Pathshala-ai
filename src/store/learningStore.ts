import { create } from "zustand";

interface LearningState {
  activePackId: string;
  activeConceptId: string | null;
  setActivePackId: (id: string) => void;
  setActiveConceptId: (id: string | null) => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  activePackId: "class10-science",
  activeConceptId: null,
  setActivePackId: (id) => set({ activePackId: id }),
  setActiveConceptId: (id) => set({ activeConceptId: id })
}));
