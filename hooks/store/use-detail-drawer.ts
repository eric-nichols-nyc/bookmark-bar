import { create } from 'zustand';

type DetailDrawerStore = {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
};

export const useDetailDrawer = create<DetailDrawerStore>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    close: () => set({ isOpen: false }),
    open: () => set({ isOpen: true }),
}));