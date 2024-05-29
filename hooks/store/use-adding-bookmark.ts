import {create} from 'zustand';

// create a store that will hold the loading state of the adding bookmark action

type AddingBookmarkStore = {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
};

export const useAddingBookmark = create<AddingBookmarkStore>((set) => ({
    isLoading: false,
    startLoading: () => set({isLoading: true}),
    stopLoading: () => set({isLoading: false}),
}));