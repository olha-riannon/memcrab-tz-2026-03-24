import React, { useState, type FC } from "react";
import type { Cell } from "../../types/types";
import "./MatrixTable.css";
import { generateRow, getPercentile, getRowSum } from "../../utils/matrixUtils";

interface MatrixTableProps {
  matrix: Cell[][];
  setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  numClosest: number;
}

const MatrixTable: FC<MatrixTableProps> = ({
  matrix,
  setMatrix,
  setRows,
  numClosest,
}) => {
  const [nearestCell, setNearestCell] = useState<number[]>([]);
  const [rowToPercent, setRowToPercent] = useState<number | null>(null);

  const columnPercentiles = matrix[0]?.map((_, colIndex) =>
    getPercentile(
      matrix.map((row) => row[colIndex].value),
      0.6,
    ),
  );

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

  const handleRemoveRow = (rowIndex: number) => {
    setMatrix((prev) => {
      const newMatrix = prev.filter((_, rId) => rId !== rowIndex);
      setRows(newMatrix.length);

      return newMatrix;
    });
  };

  const handleAddRow = () => {
    setMatrix((prev) => {
      if (!prev.length) return prev;
      const newRow = generateRow(prev[0].length);
      const updatedMatrix = [...prev, newRow];
      setRows(updatedMatrix.length);

      return updatedMatrix;
    });
  };

  return (
    <div className="matrix-table-container">
      <table>
        <thead>
          <tr className="matrix-title">
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
                <td className="matrix-title">Row {rowIndex + 1}</td>

                {row.map((cell, colIndex) => {
                  const isHighlighted = nearestCell.includes(cell.id);

                  const displayValue =
                    rowToPercent === rowIndex
                      ? `${Math.round((cell.value / rowSum) * 100)}%`
                      : cell.value;

                  const backgroundColor =
                    rowToPercent === rowIndex
                      ? `rgba(0, 120, 150, ${cell.value / maxValue})`
                      : isHighlighted
                        ? "#f87bf354"
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
                        backgroundColor,
                        transition: "1s ease",
                        cursor: "pointer",
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

                <td style={{ width: "30px", border: "none" }}>
                  <button onClick={() => handleRemoveRow(rowIndex)}>❌</button>
                </td>
              </tr>
            );
          })}

          {columnPercentiles && (
            <tr style={{ fontStyle: "italic" }}>
              <td className="matrix-title">60th percentile</td>

              {columnPercentiles.map((val, id) => (
                <td key={id}>{val}</td>
              ))}

              <td></td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="add-row-button" onClick={handleAddRow}>
        Додати рядок
      </button>
    </div>
  );
};

export default MatrixTable;
