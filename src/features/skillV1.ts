import type { MemeProfile } from '../data/memes';

export interface SkillV1Signal {
  level: number;
  title: string;
  directive: string;
  combo: string;
  progress: number;
  featuredTags: string[];
}

export interface MemeStats {
  total: number;
  liked: number;
  averageVibe: number;
  chaosIndex: number;
  topTag: string;
  legendaryCount: number;
}

const directives = [
  'Find the meme that best explains your last meeting.',
  'Favorite one that could survive a group chat audit.',
  'Shuffle until the chaos score feels medically accurate.',
  'Build a three-meme lore arc in your head.',
  'Pick the image with final boss energy.',
];

const topTagFrom = (memes: readonly MemeProfile[]) => {
  const counts = new Map<string, number>();

  memes.forEach((meme) => {
    meme.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
  });

  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ?? 'vibes';
};

export function getMemeStats(memes: readonly MemeProfile[], likedIds: ReadonlySet<string>): MemeStats {
  if (memes.length === 0) {
    return {
      total: 0,
      liked: 0,
      averageVibe: 0,
      chaosIndex: 0,
      topTag: 'vibes',
      legendaryCount: 0,
    };
  }

  const averageVibe = Math.round(memes.reduce((sum, meme) => sum + meme.vibe, 0) / memes.length);
  const chaosIndex = Math.round(memes.reduce((sum, meme) => sum + meme.chaos, 0) / memes.length);
  const legendaryCount = memes.filter((meme) => meme.rarity === 'legendary').length;

  return {
    total: memes.length,
    liked: [...likedIds].filter((id) => memes.some((meme) => meme.id === id)).length,
    averageVibe,
    chaosIndex,
    topTag: topTagFrom(memes),
    legendaryCount,
  };
}

export function getSkillV1Signal(
  memes: readonly MemeProfile[],
  activeMeme: MemeProfile,
  likedIds: ReadonlySet<string>,
): SkillV1Signal {
  const stats = getMemeStats(memes, likedIds);
  const likedBoost = stats.total === 0 ? 0 : Math.round((stats.liked / stats.total) * 24);
  const level = Math.min(99, Math.max(1, Math.round((activeMeme.vibe + activeMeme.chaos) / 2) + likedBoost));
  const directiveIndex = (activeMeme.chaos + activeMeme.tags.length + stats.liked) % directives.length;
  const progress = stats.total === 0 ? 0 : Math.round((stats.liked / stats.total) * 100);

  return {
    level,
    title: `Skill v1: ${activeMeme.arc} Specialist`,
    directive: directives[directiveIndex],
    combo: `${activeMeme.rarity.toUpperCase()} x ${stats.topTag.toUpperCase()} x ${stats.liked + 1}`,
    progress,
    featuredTags: activeMeme.tags.slice(0, 3),
  };
}
