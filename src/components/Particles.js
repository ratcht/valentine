'use client';
import React, { useEffect, useState } from 'react';

export const Particles = ({ type = 'sparkle' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 1,
      color: type === 'sparkle' 
        ? `hsl(${Math.random() * 60 + 300}, 100%, 75%)`  // Pink/Purple hues
        : `hsl(${Math.random() * 20 + 340}, 100%, 75%)`, // Red/Pink hues
      opacity: Math.random(),
      angle: Math.random() * 360
    }));

    setParticles(initialParticles);

    // Animation loop
    const interval = setInterval(() => {
      setParticles(currentParticles => 
        currentParticles.map(particle => ({
          ...particle,
          y: particle.y - (0.1 * particle.speed),
          x: particle.x + Math.sin(particle.angle * (Math.PI / 180)) * 0.2,
          opacity: particle.y < 0 ? 1 : particle.opacity - 0.001,
          angle: particle.angle + 1
        })).map(particle => 
          particle.y < -10 ? {
            ...particle,
            y: 110,
            x: Math.random() * 100,
            opacity: 1
          } : particle
        )
      );
    }, 16);

    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: `rotate(${particle.angle}deg)`,
            transition: 'all 0.016s linear'
          }}
        />
      ))}
    </div>
  );
};