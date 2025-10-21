import useStarsStore from '@/app/stores/stars.store';
import React from 'react';
import Trace from '#/ui/Trace';

const Tracers: React.FC = () =>
{
    const stars = useStarsStore(state => state.stars);

    return (
        <>
            {stars.length > 0 && (
                stars.map(star => (
                    <Trace
                        key={`${star.id}-${star.x}-${star.y}`}
                        star={star}
                    />
                ))
            )}
        </>
    );
}

export default Tracers;