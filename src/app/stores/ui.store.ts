import { create } from 'zustand';

interface UIState
{
    hiddenUI: boolean,
}

const useUIStore = create<UIState>((set) =>
({
    hiddenUI: true,
    switchUI: (hiddenUI: boolean) => set({ hiddenUI }),
}));

export default useUIStore;