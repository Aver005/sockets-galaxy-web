import React, { useEffect } from 'react';
import styles from './Star.module.css';
import { DEFAULT_CHANNEL, useConnect } from '#/hooks/use-connect';
import useClientStore from '@/app/stores/clint.store';
import { getPosition } from '#/utils/position';

const Star: React.FC = () =>
{
    const { connected, send } = useConnect();
    const myStar = useClientStore(state => state.star);

    useEffect(() =>
    {
        if (!connected) return;

        const position = getPosition();
        const sendPosition = () =>
        {
            const actual = getPosition();
            if (position[0] === actual[0] && position[1] === actual[1]) return;
            position[0] = actual[0];
            position[1] = actual[1];

            send(DEFAULT_CHANNEL, 
            {
                id: 'position',
                x: actual[0],
                y: actual[1]
            })

            useClientStore.setState({ star: { ...myStar, x: actual[0], y: actual[1] } });
        }

        const interval = setInterval(sendPosition, 30);
        return () => clearInterval(interval);
    }, 
    [connected])

    return (
        <div className='fixed inset-0 select-none pointer-events-none flex items-center justify-center'>
            <div className='relative' style={styles.star}>
                {/* <StarIcon
                    className='size-12 text-yellow-400'
                    style={{ color: myStar.color }}
                /> */}
            </div>
        </div>
    );
}

export default Star;