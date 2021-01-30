export const noop: () => void = () => {};

export const salt: () => string = () => Math.random().toString(36).slice(2);

export const range = (count: number): number[] => {
  const sequence = (function* () {
    for (let index = 0; index < count; index++) {
      yield index;
    }
  })();

  return [...sequence];
};

type Extractor<K, T> = (entry: T) => K;

export const groupBy = <K, T>(collection: T[], extractor: Extractor<K, T>): Map<K, T[]> =>
  collection.reduce((accumulator, entry) => {
    const key = extractor(entry);
    if (!accumulator.has(key)) {
      accumulator.set(key, []);
    }
    accumulator.get(key)!.push(entry);

    return accumulator;
  }, new Map<K, T[]>());
