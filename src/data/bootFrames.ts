export type ScanPosition = 'top' | 'bottom';

export interface BootFrame {
  step: number;
  counter: string;
  topLabel: string;
  glyph: string;
  scanPosition: ScanPosition;
  statusLabel: string;
  progressCount: number;
  durationMs: number;
}

/**
 * 5x7 dot-matrix bitmaps faithfully matched to the 9 Figma boot sequence frames.
 * '#' = illuminated phosphor pixel, '.' = off cell
 */
export const MATRIX_GLYPHS: Record<string, string[]> = {
  '/': [
    '....#',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '#....',
    '#....',
  ],
  '8': [
    '.###.',
    '#...#',
    '#...#',
    '.###.',
    '#...#',
    '#...#',
    '.###.',
  ],
  '3': [
    '.###.',
    '#...#',
    '....#',
    '..##.',
    '....#',
    '#...#',
    '.###.',
  ],
  '6': [
    '..##.',
    '.#...',
    '#....',
    '####.',
    '#...#',
    '#...#',
    '.###.',
  ],
  '7': [
    '#####',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '.#...',
    '.#...',
  ],
  'S': [
    '.###.',
    '#...#',
    '#....',
    '.###.',
    '....#',
    '#...#',
    '.###.',
  ],
  'D': [
    '####.',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '####.',
  ],
  'C': [
    '.###.',
    '#...#',
    '#....',
    '#....',
    '#....',
    '#...#',
    '.###.',
  ],
};

/**
 * Ordered 01 -> 09 cyclic boot sequence frames extracted from Figma PDF pages.
 */
export const BOOT_FRAMES: BootFrame[] = [
  {
    step: 1,
    counter: '01 / 09',
    topLabel: 'ASCII DECODER',
    glyph: '/',
    scanPosition: 'top',
    statusLabel: 'AWAITING SIGNAL',
    progressCount: 1,
    durationMs: 1100,
  },
  {
    step: 2,
    counter: '02 / 09',
    topLabel: 'ASCII DECODER',
    glyph: '/',
    scanPosition: 'bottom',
    statusLabel: 'CHANNEL OPEN',
    progressCount: 2,
    durationMs: 1100,
  },
  {
    step: 3,
    counter: '03 / 09',
    topLabel: 'ASCII DECODER',
    glyph: '83',
    scanPosition: 'top',
    statusLabel: 'DECODING / 83',
    progressCount: 3,
    durationMs: 1200,
  },
  {
    step: 4,
    counter: '04 / 09',
    topLabel: 'ASCII DECODER',
    glyph: 'S',
    scanPosition: 'bottom',
    statusLabel: 'DECODING / S',
    progressCount: 4,
    durationMs: 1200,
  },
  {
    step: 5,
    counter: '05 / 09',
    topLabel: 'ASCII DECODER',
    glyph: '68',
    scanPosition: 'top',
    statusLabel: 'DECODING / 68',
    progressCount: 5,
    durationMs: 1200,
  },
  {
    step: 6,
    counter: '06 / 09',
    topLabel: 'ASCII DECODER',
    glyph: 'D',
    scanPosition: 'bottom',
    statusLabel: 'DECODING / D',
    progressCount: 6,
    durationMs: 1200,
  },
  {
    step: 7,
    counter: '07 / 09',
    topLabel: 'ASCII DECODER',
    glyph: '67',
    scanPosition: 'top',
    statusLabel: 'DECODING / 67',
    progressCount: 7,
    durationMs: 1200,
  },
  {
    step: 8,
    counter: '08 / 09',
    topLabel: 'ASCII DECODER',
    glyph: 'C',
    scanPosition: 'bottom',
    statusLabel: 'DECODING / C',
    progressCount: 8,
    durationMs: 1200,
  },
  {
    step: 9,
    counter: '09 / 09',
    topLabel: 'IDENTITY RESOLVED',
    glyph: 'SDC',
    scanPosition: 'bottom',
    statusLabel: 'SIGNAL LOCKED',
    progressCount: 9,
    durationMs: 1900,
  },
];
