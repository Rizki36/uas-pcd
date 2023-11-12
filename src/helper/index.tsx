export const clipping = (value: number) => {
  return Math.max(0, Math.min(Math.floor(value), 255));
};
