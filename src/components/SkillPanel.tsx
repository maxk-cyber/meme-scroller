import type { MemeStats } from '../features/skillV1';
import type { SkillV1Signal } from '../features/skillV1';
import { SpotlightCard } from './reactbits/SpotlightCard';

interface SkillPanelProps {
  signal: SkillV1Signal;
  stats: MemeStats;
}

export function SkillPanel({ signal, stats }: SkillPanelProps) {
  return (
    <SpotlightCard className="skill-panel">
      <div className="panel-heading">
        <p className="eyebrow">Skill v1 feature engine</p>
        <h2>{signal.title}</h2>
      </div>

      <div className="level-orb" aria-label={`Skill level ${signal.level}`}>
        <span>LVL</span>
        <strong>{signal.level}</strong>
      </div>

      <p className="directive">{signal.directive}</p>
      <div className="progress-track" aria-label={`Favorite progress ${signal.progress}%`}>
        <span style={{ width: `${signal.progress}%` }} />
      </div>
      <p className="combo">Combo: {signal.combo}</p>

      <div className="tag-cloud" aria-label="Featured tags">
        {signal.featuredTags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <dl className="stats-grid">
        <div>
          <dt>Total</dt>
          <dd>{stats.total}</dd>
        </div>
        <div>
          <dt>Liked</dt>
          <dd>{stats.liked}</dd>
        </div>
        <div>
          <dt>Avg vibe</dt>
          <dd>{stats.averageVibe}</dd>
        </div>
        <div>
          <dt>Chaos</dt>
          <dd>{stats.chaosIndex}</dd>
        </div>
      </dl>
    </SpotlightCard>
  );
}
