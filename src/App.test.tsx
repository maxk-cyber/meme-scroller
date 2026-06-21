import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Meme Scroller app', () => {
  it('renders the hero, active meme, and Skill v1 panel', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /swipe through chaos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /scroll goblin/i })).toBeInTheDocument();
    expect(screen.getByText(/skill v1 feature engine/i)).toBeInTheDocument();
    expect(screen.getByText(/reactbits ui/i)).toBeInTheDocument();
  });

  it('moves through memes with controls and keyboard shortcuts', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /show next meme/i }));
    expect(screen.getByRole('heading', { name: /inbox oracle/i })).toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('heading', { name: /scroll goblin/i })).toBeInTheDocument();
  });

  it('tracks favorites in the Skill v1 progress panel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^favorite$/i }));

    expect(screen.getByRole('button', { name: /^unfavorite$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/favorite progress 14%/i)).toBeInTheDocument();
  });

  it('jumps to the first meme matching a selected tag', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /#code/i }));

    expect(screen.getByRole('heading', { name: /runtime gremlin/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /current frequency: #code/i })).toBeInTheDocument();
  });
});
