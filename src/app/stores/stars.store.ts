import { create } from 'zustand';

export interface Star
{
    id: string;
    x: number;
    y: number;
    color: string;
}

interface StarsState
{
    stars: Star[];
    add: (star: Star) => void;
    remove: (star: Star) => void;
}

const useStarsStore = create<StarsState>((set) =>
({
    stars: [],
    add: (star) => set((state) => ({ stars: [...state.stars, star] })),
    remove: (star) => set((state) => ({ stars: state.stars.filter((s) => s !== star) })),
}));

export default useStarsStore;