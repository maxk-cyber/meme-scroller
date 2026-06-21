import type { MemeProfile } from '../data/memes';
import { SpotlightCard } from './reactbits/SpotlightCard';

interface MemeCardProps {
  meme: MemeProfile;
  isFavorite: boolean;
}

export function MemeCard({ meme, isFavorite }: MemeCardProps) {
  return (
    <SpotlightCard className="meme-card">
      <div className="meme-frame">
        <img src={meme.src} alt={meme.title} />
        <div className="rarity-pill">{meme.rarity}</div>
      </div>

      <div className="meme-copy">
        <p className="eyebrow">{meme.arc}</p>
        <h2>{meme.title}</h2>
        <p>{meme.caption}</p>
      </div>

      <div className="meter-row" aria-label={`${meme.title} vibe and chaos scores`}>
        <div>
          <span>Vibe</span>
          <strong>{meme.vibe}</strong>
        </div>
        <div>
          <span>Chaos</span>
          <strong>{meme.chaos}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{isFavorite ? 'Fav' : 'Scout'}</strong>
        </div>
      </div>
    </SpotlightCard>
  );
}
