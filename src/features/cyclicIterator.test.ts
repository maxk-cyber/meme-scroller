import { createCyclicIterator } from './cyclicIterator';

describe('createCyclicIterator', () => {
  it('wraps forward and backward through items', () => {
    const iterator = createCyclicIterator(['a', 'b', 'c']);

    expect(iterator.current()).toBe('a');
    expect(iterator.next().value).toBe('b');
    expect(iterator.next().value).toBe('c');
    expect(iterator.next().value).toBe('a');
    expect(iterator.previous().value).toBe('c');
  });

  it('normalizes jumps and initial indexes', () => {
    const iterator = createCyclicIterator(['a', 'b', 'c'], -1);

    expect(iterator.current()).toBe('c');
    expect(iterator.jumpTo(4).value).toBe('b');
    expect(iterator.index).toBe(1);
  });

  it('shuffles to a different item when possible', () => {
    const iterator = createCyclicIterator(['a', 'b', 'c']);

    expect(iterator.shuffle(() => 0).value).toBe('b');
    expect(iterator.shuffle(() => 0.99).value).toBe('a');
  });

  it('rejects empty collections', () => {
    expect(() => createCyclicIterator([])).toThrow('requires at least one item');
  });
});
