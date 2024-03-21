import { create } from "zustand";

type ToggleForm = {
    show: boolean;
    setToggle: (show: boolean) => void;
};

export const useShowEditBookmarkForm = create<ToggleForm>((set) => ({
    show: false,
    setToggle: (show:boolean) => set({ show }),
}));