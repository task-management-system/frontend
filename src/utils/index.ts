export const noop: () => void = () => {};

export const salt: () => string = () => Math.random().toString(36).slice(2);
