import { create } from 'zustand';

export type MessageHandler = (data: any) => void;

interface ConnectState
{
    socket: WebSocket | null;
    connected: boolean;
    handlers: Record<string, Set<MessageHandler>>;
}

const useConnectStore = create<ConnectState>(() =>
({
    socket: null,
    connected: false,
    handlers: {},
}));

export default useConnectStore;