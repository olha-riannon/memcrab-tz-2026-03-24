import type { Cell } from "../types/types";

export const generateMatrix = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }).map((_, rowIndex) =>
    Array.from({ length: cols }).map((_, colIndex) => ({
      id: rowIndex * cols + colIndex + 1,
      value: Math.floor(Math.random() * 900) + 100,
    })),
  );
};
