export interface CyclicIterator<T> extends IterableIterator<T> {
  readonly index: number;
  readonly items: readonly T[];
  current(): T;
  previous(): IteratorResult<T>;
  jumpTo(index: number): IteratorResult<T>;
  reset(index?: number): IteratorResult<T>;
  shuffle(random?: () => number): IteratorResult<T>;
}

const normalizeIndex = (index: number, length: number) => ((index % length) + length) % length;

export function createCyclicIterator<T>(items: readonly T[], initialIndex = 0): CyclicIterator<T> {
  if (items.length === 0) {
    throw new Error('createCyclicIterator requires at least one item.');
  }

  let index = normalizeIndex(initialIndex, items.length);

  const iterator: CyclicIterator<T> = {
    get index() {
      return index;
    },
    get items() {
      return items;
    },
    current() {
      return items[index];
    },
    next() {
      index = normalizeIndex(index + 1, items.length);
      return { value: items[index], done: false };
    },
    previous() {
      index = normalizeIndex(index - 1, items.length);
      return { value: items[index], done: false };
    },
    jumpTo(nextIndex: number) {
      index = normalizeIndex(nextIndex, items.length);
      return { value: items[index], done: false };
    },
    reset(nextIndex = 0) {
      index = normalizeIndex(nextIndex, items.length);
      return { value: items[index], done: false };
    },
    shuffle(random = Math.random) {
      if (items.length === 1) {
        return { value: items[index], done: false };
      }

      const offset = 1 + Math.floor(random() * (items.length - 1));
      index = normalizeIndex(index + offset, items.length);
      return { value: items[index], done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };

  return iterator;
}
