import React, { useEffect } from 'react';
import Star from '@/shared/ui/Star';
import { DEFAULT_CHANNEL, useConnect } from '@/shared/hooks/use-connect';
import useStarsStore from '@/app/stores/stars.store';
import useClientStore from '@/app/stores/clint.store';
import { getPosition } from '#/utils/position';
import Tracers from '@/shared/ui/Tracers';
import useUIStore from '@/app/stores/ui.store';

const Home: React.FC = () =>
{
    const { connected, connect, close, send, subscribe, unsubscribe } = useConnect();
    const hiddenUI = useUIStore(state => state.hiddenUI);

    const handleConnect = () =>
    {
        connect();
        subscribe(DEFAULT_CHANNEL, (message) =>
        {
            console.log('Received message:', message);

            if (message.id === 'connect')
            {
                const { clientId, color } = message;
                const [x, y] = getPosition();
                
                useClientStore.setState({ id: clientId, star: { id: clientId, x, y, color } });
                send(DEFAULT_CHANNEL, { id: 'position', x, y });

                console.log('⭐ Connect');
                return;
            }

            if (message.id === 'new')
            {
                const { clientId, color, x, y } = message;
                const stars = useStarsStore.getState().stars;
                useStarsStore.setState({ stars: [...stars, { id: clientId, x, y, color }] });
                return;
            }

            if (message.id === 'position')
            {
                const { clientId, x, y } = message;
                const stars = useStarsStore.getState().stars;
                useStarsStore.setState({ stars: stars.map(star => star.id === clientId ? { ...star, x, y } : star) });
                return;
            }

            if (message.id === 'disconnect')
            {
                const { clientId } = message;
                const stars = useStarsStore.getState().stars;
                useStarsStore.setState({ stars: stars.filter(star => star.id !== clientId) });
                return;
            }
        })
    };

    useEffect(() =>
    {
        if (!connected) return;
        return () => unsubscribe(DEFAULT_CHANNEL);
    }, 
    [connected])

    return (
        <>
            <header className={`flex h-20 px-8 w-full  justify-between items-center ${hiddenUI ? '' : 'bg-base-300'}`}>
                {!hiddenUI && (connected ? 'Connected' : 'Not connected')}
                <div className='space-x-4'>
                    <button 
                        onClick={handleConnect}
                        className='btn btn-primary'
                        disabled={connected}
                    >
                        Connect
                    </button>
                    <button
                        onClick={() => close()}
                        className='btn btn-primary'
                        disabled={!connected}
                    >
                        Close
                    </button>
                </div>
            </header>

            {connected && <Star />}
            {connected && <Tracers />}

            <button
                onClick={() => useUIStore.setState({ hiddenUI: !hiddenUI })}
                className='btn btn-soft btn-primary absolute right-4 bottom-4'
            >
                {hiddenUI ? 'Show UI' : 'Hide UI'}
            </button>
        </>
    );
}

export default Home;