'use client'
import React, { useEffect, useState } from 'react';
import './bubble.css'; // pastikan file CSS efek bubble ada

const FloatingBubbles = ({ count = 15 }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        size: Math.random() * 40 + 10,
        posX: Math.random() * 100,
        posY: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setBubbles(generated);
  }, [count]);

  return (
    <div className="floating-elements-container">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="floating-element bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.posX}%`,
            top: `${bubble.posY}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            opacity: bubble.opacity,
            position: 'absolute'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
