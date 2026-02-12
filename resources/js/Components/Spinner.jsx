import React from "react";

export default function Spinner({ className = "" }) {
    return (
        <div className={`relative inline-block ${className}`} style={{ width: '32px', height: '32px' }}>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-current rounded-full"
                    style={{
                        width: '2px',
                        height: '8px',
                        left: '15px',
                        top: '0',
                        transform: `rotate(${i * 30}deg)`,
                        transformOrigin: '1px 16px',
                        opacity: 1 - (0.75 / 12) * i,
                        animation: `ios-spinner 1.2s linear infinite`,
                        animationDelay: `${-1.1 + i * 0.1}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes ios-spinner {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
}

