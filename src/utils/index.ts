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
