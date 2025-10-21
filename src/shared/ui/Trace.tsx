import type { Star } from '@/app/stores/stars.store';
import React from 'react';
import { getPosition } from '#/utils/position';
import useClientStore from '@/app/stores/clint.store';
import useUIStore from '@/app/stores/ui.store';

const Trace: React.FC<{ star: Star }> = ({ star }) => 
{
    const hiddenUI = useUIStore(state => state.hiddenUI);
    useClientStore(state => state.star);
    const mainPos = getPosition();

    const dx = star.x - mainPos[0];
    const dy = star.y - mainPos[1];
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const length = Math.sqrt(dx * dx + dy * dy) * 0.8;
    const x1 = window.innerWidth / 2;
    const y1 = window.innerHeight / 2;
    const x2 = x1 + length * Math.cos(angle * Math.PI / 180);
    const y2 = y1 + length * Math.sin(angle * Math.PI / 180);

    return (
        <>
            <style>{`
                @keyframes thunderFlash {
                    0%   { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
                    10%  { stroke: rgba(150,220,255,1); stroke-width: 4; }
                    20%  { stroke: rgba(255,255,255,0.3); stroke-width: 2; }
                    30%  { stroke: rgba(100,200,255,0.9); stroke-width: 3; }
                    40%  { stroke: rgba(255,255,255,0.1); stroke-width: 1; }
                    50%  { stroke: rgba(120,210,255,1); stroke-width: 5; }
                    60%  { stroke: rgba(255,255,255,0.2); stroke-width: 2; }
                    100% { stroke: rgba(255,255,255,0.2); stroke-width: 1; }
                }
                @keyframes pulseGlow {
                    0%   { filter: drop-shadow(0 0 2px rgba(100,200,255,0.5)); }
                    50%  { filter: drop-shadow(0 0 8px rgba(150,220,255,1)); }
                    100% { filter: drop-shadow(0 0 2px rgba(100,200,255,0.5)); }
                }
                @keyframes particleFade {
                    0%   { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.3); }
                }
                .trace-line {
                    animation: thunderFlash 12s ease-out infinite, pulseGlow 3s ease-in-out infinite;
                }
                .trace-particle {
                    animation: particleFade 2s ease-out forwards;
                }
            `}</style>
            <svg
                className="fixed inset-0 pointer-events-none"
                width={window.innerWidth}
                height={window.innerHeight}
                key={`${star.id}-${star.x}-${star.y}`}
            >
                <defs>
                    <linearGradient id={`grad-${star.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(150,220,255,0.8)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="100%" stopColor="rgba(100,200,255,0.8)" />
                    </linearGradient>
                </defs>
                <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={`url(#grad-${star.id})`}
                    className="trace-line"
                />
                {/* Animated particles along the line */}
                {Array.from({ length: 5 }).map((_, i) => {
                    const t = (i + 1) / 6;
                    const px = x1 + (x2 - x1) * t;
                    const py = y1 + (y2 - y1) * t;
                    const delay = i * 0.4;
                    return (
                        <circle
                            key={i}
                            cx={px}
                            cy={py}
                            r="2"
                            fill="rgba(255,255,255,0.9)"
                            className="trace-particle"
                            style={{ animationDelay: `${delay}s` }}
                        />
                    );
                })}
            </svg>
            {!hiddenUI && (
                <div className="badge badge-accent badge-soft">
                    {star.id} ({star.x}, {star.y})
                </div>
            )}
        </>
    );
};

export default Trace;