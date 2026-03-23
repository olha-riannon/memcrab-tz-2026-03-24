import type { Cell } from "../types/types";

let globalId = 1;

export const generateRow = (cols: number): Cell[] => {
  return Array.from({ length: cols }, () => ({
    id: globalId++,
    value: Math.floor(Math.random() * 900) + 100,
  }));
};

export const generateMatrix = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, () => generateRow(cols));
};
