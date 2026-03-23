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

export const getRowSum = (row: Cell[]) =>
  row.reduce((acc, cell) => acc + cell.value, 0);

export const getPercentile = (values: number[], percentile: number): number => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = percentile * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);

  return (
    Math.round(
      (sorted[lower] + (sorted[upper] - sorted[lower]) * (rank - lower)) * 10,
    ) / 10
  );
};
