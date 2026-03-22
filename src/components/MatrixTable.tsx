import React, { type FC } from "react";
import type { Cell } from "../types/types";
import "../css/MatrixTable.css";

interface MatrixTableProps {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  numClosest: number;
  hoveredCellId: number | null;
  setHoveredCellId: React.Dispatch<React.SetStateAction<number | null>>;
}

const MatrixTable: FC<MatrixTableProps> = ({ matrix }) => {
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

  return (
    <div className="matrix-table-container">
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => (
                <td key={cell.id}>{cell.value}</td>
              ))}
              <td style={{ fontWeight: "bold" }}>{getRowSum(row)}</td>
            </tr>
          ))}

          {columnPercentiles && (
            <tr style={{ fontStyle: "italic" }}>
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
