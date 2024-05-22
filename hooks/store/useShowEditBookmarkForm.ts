import { create } from "zustand";

type ToggleForm = {
    showBookmarkEditDrawer: boolean;
    setToggle: () => void;
    currentBookmarkId: string | undefined;
    setCurrentBookmarkId: (id: string) => void;
};

export const useShowEditBookmarkForm = create<ToggleForm>((set) => ({
    showBookmarkEditDrawer: false,
    setToggle: () => set((state) => ({ showBookmarkEditDrawer: !state.showBookmarkEditDrawer })),
    currentBookmarkId: undefined,
    setCurrentBookmarkId: (currentBookmarkId: string) => set({ currentBookmarkId }),
}));

//   toggle: () => set((state) => ({ isOpen: !state.isOpen })),
