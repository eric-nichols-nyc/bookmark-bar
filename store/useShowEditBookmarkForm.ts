import { create } from "zustand";

type ToggleForm = {
    show: boolean;
    setToggle: (show: boolean) => void;
    currentBookmarkId: string | undefined;
    setCurrentBookmarkId: (id: string) => void;
};

export const useShowEditBookmarkForm = create<ToggleForm>((set) => ({
    show: false,
    setToggle: (show:boolean) => set({ show }),
    currentBookmarkId: undefined,
    setCurrentBookmarkId: (currentBookmarkId: string) => set({ currentBookmarkId }),
}));