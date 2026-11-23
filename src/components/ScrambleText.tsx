import { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#·';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 10;
    const intervalMs = 24;

    const intervalId = window.setInterval(() => {
      frame += 1;
      const lockProgress = frame / totalFrames;

      const next = text
        .split('')
        .map((char, idx) => {
          if (char === ' ' || char === '/' || char === '·') {
            return char;
          }
          const charThreshold = (idx + 1) / text.length;
          if (lockProgress >= charThreshold) {
            return char;
          }
          const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
          return SCRAMBLE_CHARS[randomIndex];
        })
        .join('');

      setDisplayText(next);

      if (frame >= totalFrames) {
        setDisplayText(text);
        window.clearInterval(intervalId);
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
