import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BOOT_FRAMES } from '../data/bootFrames';
import { PixelGlyph } from './PixelGlyph';
import { ScrambleText } from './ScrambleText';

function Chevron({
  direction,
  isResolved,
}: {
  direction: 'left' | 'right';
  isResolved: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 28 32"
      fill="none"
      aria-hidden="true"
      animate={{
        scale: isResolved ? [1, 1.08, 1] : 1,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`h-7 w-6 sm:h-8 sm:w-7 shrink-0 transition-colors duration-300 ${
        isResolved
          ? 'text-[#c084fc] drop-shadow-[0_0_16px_rgba(192,132,252,0.98)]'
          : 'text-[#a862ff] drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]'
      }`}
    >
      {direction === 'left' ? (
        <path
          d="M23 5L5 16L23 27"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 5L23 16L5 27"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </motion.svg>
  );
}

export function BootSequenceStage() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentFrame = BOOT_FRAMES[frameIndex];
  const isCompact = currentFrame.step === 1;
  const isScanTop = currentFrame.scanPosition === 'top';
  const isResolved = currentFrame.step === 9;

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setTimeout(() => {
      setFrameIndex((prev) => (prev + 1) % BOOT_FRAMES.length);
    }, currentFrame.durationMs);

    return () => window.clearTimeout(timer);
  }, [frameIndex, isPaused, currentFrame.durationMs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (event.code === 'ArrowRight') {
        setFrameIndex((prev) => (prev + 1) % BOOT_FRAMES.length);
      } else if (event.code === 'ArrowLeft') {
        setFrameIndex(
          (prev) => (prev - 1 + BOOT_FRAMES.length) % BOOT_FRAMES.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="sdc-grid-bg relative flex h-dvh w-full flex-col items-center justify-center px-6 py-8 sm:px-14 select-none overflow-hidden">
      {/* Subtle breathing ambient radial glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isResolved ? 0.95 : [0.45, 0.65, 0.45],
          scale: isResolved ? 1.18 : [0.98, 1.04, 0.98],
        }}
        transition={
          isResolved
            ? { duration: 0.5, ease: 'easeOut' }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
        className="pointer-events-none absolute h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,rgba(88,28,135,0.06)_45%,transparent_72%)]"
      />

      {/* Center Decoder Stage */}
      <section
        aria-live="polite"
        aria-label={`Loading ${currentFrame.glyph}`}
        className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center justify-center"
      >
        {/* Top Label: LOADING */}
        <div className="mb-4 sm:mb-6 flex h-6 items-center justify-center">
          <p className="text-center text-[13px] sm:text-[16px] font-medium tracking-[0.28em] text-[#dcd0ff]">
            <ScrambleText text="LOADING" />
          </p>
        </div>

        {/* Decoder Display (no corner brackets) */}
        <motion.div
          animate={{
            scale: isCompact ? 0.985 : isResolved ? [1, 1.018, 1] : 1,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[172px] w-full max-w-[490px] sm:h-[196px] sm:max-w-[540px] items-center justify-center"
        >
          {/* Radial lock-in bloom on frame 9 */}
          <AnimatePresence>
            {isResolved && (
              <motion.div
                key="lock-bloom"
                aria-hidden="true"
                initial={{ opacity: 0.65, scale: 0.7 }}
                animate={{ opacity: 0, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute h-40 w-72 rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.28)_0%,transparent_70%)]"
              />
            )}
          </AnimatePresence>

          {/* Glowing Scan Line + Directional Phosphor Wake */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              top: isScanTop ? '14px' : 'calc(100% - 16px)',
            }}
            transition={{
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute left-10 right-10 sm:left-12 sm:right-12"
          >
            {/* Soft beam wake */}
            <motion.div
              key={currentFrame.step}
              initial={{ opacity: 0.75, scaleY: 1 }}
              animate={{ opacity: 0.15, scaleY: 0.4 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`absolute left-2 right-2 h-8 origin-center bg-gradient-to-b ${
                isScanTop
                  ? 'top-0 from-[#a855f7]/25 to-transparent'
                  : 'bottom-0 from-transparent to-[#a855f7]/25'
              }`}
            />
            {/* Crisp core laser line */}
            <div className="relative h-[2px] w-full rounded-full bg-gradient-to-r from-[#6d28d9]/65 via-[#c084fc] to-[#6d28d9]/65 shadow-[0_0_12px_rgba(168,85,247,0.9),0_0_28px_rgba(139,92,246,0.55)]" />
          </motion.div>

          {/* Expanding Angle Chevrons (</> in frame 1 -> < / > in frames 2..9) + Central Dot-Matrix Glyph */}
          <div className="relative flex w-full items-center justify-center px-7 sm:px-14">
            <motion.div
              initial={false}
              animate={{ width: isCompact ? 124 : '100%' }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24,
                mass: 0.9,
              }}
              className="relative flex items-center justify-between"
            >
              <Chevron direction="left" isResolved={isResolved} />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex min-h-[76px] items-center justify-center">
                <AnimatePresence mode="wait">
                  <PixelGlyph
                    key={currentFrame.step}
                    text={currentFrame.glyph}
                    scanPosition={currentFrame.scanPosition}
                    step={currentFrame.step}
                  />
                </AnimatePresence>
              </div>

              <Chevron direction="right" isResolved={isResolved} />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer Text */}
        <p className="mt-6 sm:mt-8 text-center text-[11px] sm:text-[14px] font-medium tracking-[0.22em] text-[#9b8eb6]">
          LOADING &nbsp;/ &nbsp;S &nbsp;· &nbsp;D &nbsp;· &nbsp;C
        </p>
      </section>
    </main>
  );
}
