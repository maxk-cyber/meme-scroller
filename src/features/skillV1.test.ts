import { memes } from '../data/memes';
import { getMemeStats, getSkillV1Signal } from './skillV1';

describe('Skill v1 feature engine', () => {
  it('summarizes meme catalog stats and favorites', () => {
    const likedIds = new Set([memes[0].id, memes[2].id, 'missing']);
    const stats = getMemeStats(memes, likedIds);

    expect(stats.total).toBe(7);
    expect(stats.liked).toBe(2);
    expect(stats.legendaryCount).toBe(3);
    expect(stats.averageVibe).toBeGreaterThan(80);
    expect(stats.topTag).toBeTruthy();
  });

  it('builds an active mission from selected meme and progress', () => {
    const likedIds = new Set([memes[0].id, memes[1].id]);
    const signal = getSkillV1Signal(memes, memes[2], likedIds);

    expect(signal.title).toContain(memes[2].arc);
    expect(signal.level).toBeGreaterThan(1);
    expect(signal.progress).toBe(29);
    expect(signal.featuredTags).toEqual(memes[2].tags.slice(0, 3));
    expect(signal.combo).toContain('LEGENDARY');
  });

  it('handles empty stat collections safely', () => {
    expect(getMemeStats([], new Set())).toEqual({
      total: 0,
      liked: 0,
      averageVibe: 0,
      chaosIndex: 0,
      topTag: 'vibes',
      legendaryCount: 0,
    });
  });
});
