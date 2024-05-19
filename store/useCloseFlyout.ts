import {create} from 'zustand';

type FlyoutStore = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};
// create a store from zustand to manage the state of the flyout menu
export const useFlyoutStore = create<FlyoutStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));