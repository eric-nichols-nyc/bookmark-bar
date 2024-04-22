import {create} from "zustand";

export const useFolders = create((set) => ({
    folders: [],
    setFolders: (folders) => set({folders}),
    addFolder: (folder) => set((state) => ({folders: [...state.folders, folder]})),
    deleteFolder: (id) => set((state) => ({folders: state.folders.filter((folder) => folder.id !== id)})),
    updateFolder: (id, name) =>
        set((state) => ({
            folders: state.folders.map((folder) => {
                if (folder.id === id) {
                    return {...folder, name};
                }
                return folder;
            }),
        })),
}));