import { motion } from 'motion/react';
import { MATRIX_GLYPHS, ScanPosition } from '../data/bootFrames';

interface PixelGlyphProps {
  text: string;
  scanPosition: ScanPosition;
  step: number;
}

export function PixelGlyph({ text, scanPosition, step }: PixelGlyphProps) {
  const chars = text.split('');
  const isResolved = step === 9;

  return (
    <motion.div
      key={`${step}-${text}`}
      initial={{ opacity: 0.4, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(2px)',
        transition: { duration: 0.14, ease: 'easeIn' },
      }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-3.5 sm:gap-4"
      aria-label={text}
    >
      {chars.map((char, charIdx) => {
        const rows = MATRIX_GLYPHS[char] ?? MATRIX_GLYPHS['/'];
        return (
          <div
            key={`${charIdx}-${char}`}
            className="grid grid-cols-5 gap-[2.5px] sm:gap-[3px]"
          >
            {rows.map((rowStr, rowIdx) =>
              rowStr.split('').map((cell, colIdx) => {
                const isOn = cell === '#';
                const directionalRow =
                  scanPosition === 'bottom' ? rowIdx : 6 - rowIdx;
                const delay =
                  charIdx * 0.04 + directionalRow * 0.02 + colIdx * 0.01;

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="relative h-[7px] w-[7px] sm:h-[9px] sm:w-[9px] flex items-center justify-center"
                  >
                    {/* Subtle unlit LED matrix backing */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[1.5px] bg-[#2a194a]/22"
                    />

                    {isOn && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          scale: 0.4,
                          backgroundColor: '#ffffff',
                        }}
                        animate={{
                          opacity: 1,
                          scale: [0.4, 1.18, 1],
                          backgroundColor: ['#ffffff', '#e9d5ff', '#cfa8ff'],
                        }}
                        transition={{
                          duration: 0.32,
                          delay,
                          times: [0, 0.45, 1],
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`relative z-10 block h-full w-full rounded-[1.5px] ${
                          isResolved
                            ? 'shadow-[0_0_10px_rgba(192,132,252,0.95),0_0_22px_rgba(139,92,246,0.65)]'
                            : 'shadow-[0_0_8px_rgba(179,112,255,0.85),0_0_16px_rgba(139,92,246,0.45)]'
                        }`}
                      />
                    )}
                  </div>
                );
              }),
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
