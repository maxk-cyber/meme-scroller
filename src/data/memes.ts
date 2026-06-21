import meme1 from '../../meme1.png';
import meme2 from '../../meme2.png';
import meme3 from '../../meme3.png';
import meme4 from '../../meme4.png';
import meme5 from '../../meme5.png';
import meme6 from '../../meme6.png';
import meme7 from '../../meme7.png';

export type MemeRarity = 'fresh' | 'spicy' | 'legendary';

export interface MemeProfile {
  id: string;
  title: string;
  caption: string;
  src: string;
  tags: string[];
  vibe: number;
  chaos: number;
  rarity: MemeRarity;
  arc: string;
}

export const memes: MemeProfile[] = [
  {
    id: 'meme-1',
    title: 'Scroll Goblin',
    caption: 'Tiny hands, enormous feed energy.',
    src: meme1,
    tags: ['chaos', 'night-scroll', 'goblin-mode'],
    vibe: 86,
    chaos: 72,
    rarity: 'spicy',
    arc: 'Opening Act',
  },
  {
    id: 'meme-2',
    title: 'Inbox Oracle',
    caption: 'Sees every notification before it ruins your day.',
    src: meme2,
    tags: ['work', 'prophecy', 'unread'],
    vibe: 74,
    chaos: 58,
    rarity: 'fresh',
    arc: 'Office Lore',
  },
  {
    id: 'meme-3',
    title: 'Quantum Snack',
    caption: 'Both already eaten and saved for later.',
    src: meme3,
    tags: ['snack', 'science', 'coping'],
    vibe: 91,
    chaos: 84,
    rarity: 'legendary',
    arc: 'Kitchen Myth',
  },
  {
    id: 'meme-4',
    title: 'Meeting Mirage',
    caption: 'The calendar invite was inside you all along.',
    src: meme4,
    tags: ['work', 'calendar', 'surreal'],
    vibe: 69,
    chaos: 63,
    rarity: 'fresh',
    arc: 'Office Lore',
  },
  {
    id: 'meme-5',
    title: 'Runtime Gremlin',
    caption: 'It passed locally because the gremlin allowed it.',
    src: meme5,
    tags: ['code', 'bug', 'gremlin'],
    vibe: 95,
    chaos: 89,
    rarity: 'legendary',
    arc: 'Dev Dungeon',
  },
  {
    id: 'meme-6',
    title: 'Vibe Compiler',
    caption: 'Turns one good reaction into a production deploy.',
    src: meme6,
    tags: ['code', 'vibes', 'ship-it'],
    vibe: 88,
    chaos: 61,
    rarity: 'spicy',
    arc: 'Dev Dungeon',
  },
  {
    id: 'meme-7',
    title: 'Main Character Buffer',
    caption: 'Loading confidence with suspiciously dramatic music.',
    src: meme7,
    tags: ['confidence', 'drama', 'glow-up'],
    vibe: 93,
    chaos: 76,
    rarity: 'legendary',
    arc: 'Final Boss',
  },
];

export const allMemeTags = Array.from(new Set(memes.flatMap((meme) => meme.tags))).sort();
