import { create } from "zustand";

type Presence = {
  [userId: string]: Array<{ onlineAt: string }>;
};

interface PresenceState {
  presence: Presence | null;
  setPresence: (newPresence: Presence) => void;
}

export const usePresenceStore = create<PresenceState>((set) => ({
  presence: null,
  setPresence: (newPresence) => set({ presence: newPresence }),
}));
