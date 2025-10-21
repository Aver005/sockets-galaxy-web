import useClientStore from '@/app/stores/clint.store';
import useConnectStore, { type MessageHandler } from '@/app/stores/connect.store';
import useStarsStore from '@/app/stores/stars.store';

export const DEFAULT_CHANNEL = 'test';

export function useConnect()
{
    const connected = useConnectStore(state => state.connected);

    const connect = () =>
    {
        const socket = new WebSocket(import.meta.env.VITE_WS_URL);
        useConnectStore.setState({ socket });

        socket.onopen = () =>
        {
            console.log('Connected to server');
            useStarsStore.setState({ stars: [] });
            useConnectStore.setState({ connected: true });
        };

        socket.onclose = () =>
        {
            useStarsStore.setState({ stars: [] });
            useConnectStore.setState({ connected: false });
        }
        
        socket.onerror = () =>
        {
            useStarsStore.setState({ stars: [] });
            useConnectStore.setState({ connected: false });
        }

        socket.onmessage = (event) =>
        {
            try
            {
                const parsed = JSON.parse(event.data);
                const { channel, payload } = parsed;
                if (!channel) return
                if (!useConnectStore.getState().handlers[channel]) return
                useConnectStore.getState().handlers[channel].forEach((cb) => cb(payload));
            } 
            catch (e)
            {
                console.error('Failed to parse message', e);
            }
        };

        return socket;
    };

    const send = (channel: string, data: any) =>
    {
        const socket = useConnectStore.getState().socket;
        const client = useClientStore.getState().id;
        if (socket && socket.readyState === WebSocket.OPEN)
        {
            const payload = {...data, client }
            socket.send(JSON.stringify({ channel, payload }));
        }
    };

    const subscribe = (channel: string, callback: MessageHandler) =>
    {
        const handlers = useConnectStore.getState().handlers;
        if (!handlers[channel])
        {
            handlers[channel] = new Set();
        }
        handlers[channel].add(callback);

        return () =>
        {
            handlers[channel]?.delete(callback);
        };
    };

    const unsubscribe = (channel: string) =>
    {
        const handlers = useConnectStore.getState().handlers;
        delete handlers[channel];
    };

    const close = () =>
    {
        const socket = useConnectStore.getState().socket;
        if (!socket) return;
        console.log('Disconnected from server');
        socket.close();
        unsubscribe(DEFAULT_CHANNEL);
    }

    return { connected, connect, close, send, subscribe, unsubscribe };
}
