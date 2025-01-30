'use client';
import React, { useEffect, useState } from 'react';

export const HandwrittenText = ({ text, className = '', speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
        if (index > text.length) {
          setIsComplete(true);
          clearInterval(timer);
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={`font-handwriting transition-opacity duration-300 ${className} ${isComplete ? 'opacity-100' : 'opacity-90'}`}>
      {displayedText}
      <span className={`inline-block ml-1 ${isComplete ? 'hidden' : ''}`}>|</span>
    </div>
  );
};