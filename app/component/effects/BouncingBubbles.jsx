'use client'
import React, { useEffect, useState } from 'react';
import './bubble.css';

const BouncingBubbles = ({ count = 10 }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        size: Math.random() * 30 + 15,
        left: Math.random() * 100,
        bottom: Math.random() * 20,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    setBubbles(generated);
  }, [count]);

  return (
    <div className="bouncing-elements-container">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bouncing-element bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: `${bubble.bottom}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            opacity: bubble.opacity,
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
};

export default BouncingBubbles;
