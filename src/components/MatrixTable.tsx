import React, { useState, type FC } from "react";
import type { Cell } from "../types/types";
import "../css/MatrixTable.css";

interface MatrixTableProps {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  numClosest: number;
}

const MatrixTable: FC<MatrixTableProps> = ({
  matrix,
  setMatrix,
  numClosest,
}) => {
  const [nearestCell, setNearestCell] = useState<number[]>([]);
  const [rowToPercent, setRowToPercent] = useState<number | null>(null);

  const getRowSum = (row: Cell[]) =>
    row.reduce((acc, cell) => acc + cell.value, 0);

  const getPercentile = (values: number[], percentile: number): number => {
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

  const columnPercentiles = matrix[0]?.map((_, colIndex) =>
    getPercentile(
      matrix.map((row) => row[colIndex].value),
      0.6,
    ),
  );

  const handleIncreaseClick = (rowIndex: number, colIndex: number) => {
    setMatrix((prev) =>
      prev.map((row, rId) =>
        rId === rowIndex
          ? row.map((cell, cId) =>
              cId === colIndex ? { ...cell, value: cell.value + 1 } : cell,
            )
          : row,
      ),
    );
  };

  const findNearestCells = (
    matrix: Cell[][],
    targetValue: number,
    numClosest: number,
  ) => {
    const allCells = matrix.flat();
    const sortedByDistance = allCells
      .filter((cell) => cell.value !== targetValue)
      .sort(
        (a, b) =>
          Math.abs(a.value - targetValue) - Math.abs(b.value - targetValue),
      );
    return sortedByDistance.slice(0, numClosest).map((cell) => cell.id);
  };

  return (
    <div className="matrix-table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            {matrix[0]?.map((_, colIndex) => (
              <th key={colIndex}>Col {colIndex + 1}</th>
            ))}
            <th>Sum</th>
          </tr>
        </thead>

        <tbody>
          {matrix.map((row, rowIndex) => {
            const rowSum = getRowSum(row);
            const maxValue = Math.max(...row.map((c) => c.value));

            return (
              <tr key={rowIndex}>
                <td style={{ fontWeight: "bold" }}>Row {rowIndex + 1}</td>

                {row.map((cell, colIndex) => {
                  const isHighlighted = nearestCell.includes(cell.id);

                  const displayValue =
                    rowToPercent === rowIndex
                      ? `${Math.round((cell.value / rowSum) * 100)}%`
                      : cell.value;

                  const backgroundColor =
                    rowToPercent === rowIndex
                      ? `rgba(0, 0, 255, ${cell.value / maxValue})`
                      : isHighlighted
                        ? "gray"
                        : "transparent";

                  return (
                    <td
                      key={cell.id}
                      onClick={() => handleIncreaseClick(rowIndex, colIndex)}
                      onMouseEnter={() =>
                        setNearestCell(
                          findNearestCells(matrix, cell.value, numClosest),
                        )
                      }
                      onMouseLeave={() => setNearestCell([])}
                      style={{
                        cursor: "pointer",
                        backgroundColor,
                      }}
                    >
                      {displayValue}
                    </td>
                  );
                })}

                <td
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onMouseEnter={() => setRowToPercent(rowIndex)}
                  onMouseLeave={() => setRowToPercent(null)}
                >
                  {rowSum}
                </td>
              </tr>
            );
          })}

          {columnPercentiles && (
            <tr style={{ fontStyle: "italic" }}>
              <td style={{ fontWeight: "bold" }}>60th percentile</td>

              {columnPercentiles.map((val, id) => (
                <td key={id}>{val}</td>
              ))}

              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixTable;
