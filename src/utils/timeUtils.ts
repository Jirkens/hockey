export const secondsToMinutesAndSeconds = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString();
  const s = (seconds % 60).toString().padStart(2,'0');

  return `${m}:${s}`;
};
