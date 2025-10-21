import { create } from 'zustand';
import type { Star } from './stars.store';

interface ClientState
{
    id: string,
    star: Star
}

const useClientStore = create<ClientState>(() =>
({
    id: '',
    star: { id: '', x: 0, y: 0, color: '' },
}));

export default useClientStore;