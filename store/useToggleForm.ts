import { create } from "zustand";

type ToggleForm = {
    show: boolean;
    setToggle: (show: boolean) => void;
};

export const useToggleForm = create<ToggleForm>((set) => ({
    show: false,
    setToggle: (show:boolean) => set({ show }),
}));