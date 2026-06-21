import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import { MemeCard } from './components/MemeCard';
import { SkillPanel } from './components/SkillPanel';
import { AuroraBackground } from './components/reactbits/AuroraBackground';
import { ClickSpark } from './components/reactbits/ClickSpark';
import { allMemeTags, memes } from './data/memes';
import { createCyclicIterator } from './features/cyclicIterator';
import { getMemeStats, getSkillV1Signal } from './features/skillV1';

function App() {
  const iteratorRef = useRef(createCyclicIterator(memes));
  const [activeIndex, setActiveIndex] = useState(iteratorRef.current.index);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [focusTag, setFocusTag] = useState(allMemeTags[0]);

  const activeMeme = memes[activeIndex];
  const stats = useMemo(() => getMemeStats(memes, favoriteIds), [favoriteIds]);
  const signal = useMemo(() => getSkillV1Signal(memes, activeMeme, favoriteIds), [activeMeme, favoriteIds]);
  const isFavorite = favoriteIds.has(activeMeme.id);

  const syncActiveIndex = () => setActiveIndex(iteratorRef.current.index);

  const goNext = () => {
    iteratorRef.current.next();
    syncActiveIndex();
  };

  const goPrevious = () => {
    iteratorRef.current.previous();
    syncActiveIndex();
  };

  const shuffle = () => {
    iteratorRef.current.shuffle();
    syncActiveIndex();
  };

  const jumpTo = (index: number) => {
    iteratorRef.current.jumpTo(index);
    syncActiveIndex();
  };

  const jumpToTag = (tag: string) => {
    setFocusTag(tag);
    const matchingIndex = memes.findIndex((meme) => meme.tags.includes(tag));
    if (matchingIndex >= 0) {
      jumpTo(matchingIndex);
    }
  };

  const toggleFavorite = () => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(activeMeme.id)) {
        next.delete(activeMeme.id);
      } else {
        next.add(activeMeme.id);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goNext();
      }
      if (event.key === 'ArrowLeft') {
        goPrevious();
      }
      if (event.key.toLowerCase() === 'f') {
        toggleFavorite();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <AuroraBackground>
      <main className="app-shell">
        <section className="hero">
          <div>
            <p className="eyebrow">Meme Scroller 2.0</p>
            <h1>Swipe through chaos with a smarter meme engine.</h1>
            <p className="hero-copy">
              A ReactBits-inspired gallery with spark controls, spotlight cards, keyboard shortcuts,
              favorites, shuffle, and an iterator-powered Skill v1 mission layer.
            </p>
          </div>

          <div className="hero-badges" aria-label="Project highlights">
            <span>ReactBits UI</span>
            <span>Iterator core</span>
            <span>Skill v1</span>
          </div>
        </section>

        <section className="feature-grid" aria-label="Meme browser">
          <div className="deck-column">
            <MemeCard meme={activeMeme} isFavorite={isFavorite} />

            <div className="controls" aria-label="Meme controls">
              <ClickSpark className="ghost-button" onClick={goPrevious} aria-label="Show previous meme">
                Previous
              </ClickSpark>
              <ClickSpark className="primary-button" onClick={toggleFavorite} aria-pressed={isFavorite}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
              </ClickSpark>
              <ClickSpark className="ghost-button" onClick={goNext} aria-label="Show next meme">
                Next
              </ClickSpark>
              <ClickSpark className="shuffle-button" onClick={shuffle}>
                Shuffle chaos
              </ClickSpark>
            </div>

            <div className="meme-rail" aria-label="Jump to meme">
              {memes.map((meme, index) => (
                <button
                  type="button"
                  key={meme.id}
                  className={index === activeIndex ? 'rail-dot rail-dot--active' : 'rail-dot'}
                  aria-label={`Jump to ${meme.title}`}
                  onClick={() => jumpTo(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <SkillPanel signal={signal} stats={stats} />
        </section>

        <section className="tag-section" aria-label="Meme tag tuner">
          <div>
            <p className="eyebrow">Tag tuner</p>
            <h2>Current frequency: #{focusTag}</h2>
          </div>
          <div className="tag-cloud tag-cloud--interactive">
            {allMemeTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className={tag === focusTag ? 'tag-button tag-button--active' : 'tag-button'}
                onClick={() => jumpToTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      </main>
    </AuroraBackground>
  );
}

export default App;
