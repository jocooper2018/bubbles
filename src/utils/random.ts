import Vector2 from "../classes/Vector2";

export const randomPosition = (width: number, height: number): Vector2 => {
  return new Vector2(
    randFloat(0, window.innerWidth - width * 2) + width,
    randFloat(0, window.innerHeight - height * 2) + height
  );
};

export const randInt = (start: number, end: number): number => {
  if (start > end) throw new Error("start > end");
  start = Math.round(start);
  end = Math.round(end);
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export const randFloat = (start: number, end: number): number => {
  if (start > end) throw new Error("start > end");
  return Math.random() * (end - start) + start;
};
