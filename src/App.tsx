import { useState } from "react";
import { generateMatrix } from "./utils/generateMatrix";
import type { Cell } from "./types/types";
import MatrixTable from "./components/MatrixTable/MatrixTable";
import Input from "./components/Input/Input";
import "./components/Input/Input.css";

function App() {
  const [rows, setRows] = useState(0); // M
  const [cols, setCols] = useState(0); // N
  const [numClosest, setNumClosest] = useState(0); // X
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (rows === 0 || cols === 0) {
      setError(
        rows === 0 && cols === 0
          ? "Введіть кількість для рядків та колонок."
          : rows === 0
            ? "Кількість рядків не може бути 0."
            : "Кількість колонок не може бути 0.",
      );
      setMatrix([]);
      return;
    }

    setMatrix(generateMatrix(rows, cols));
    setError(null);
  };

  return (
    <div>
      <div>
        <h1>Matrix App</h1>
        <div className="container">
          <div className="input-container">
            <Input
              name="Число рядків"
              value={rows}
              setValue={setRows}
              min={0}
              max={100}
            />
            <Input
              name="Число стовпців"
              value={cols}
              setValue={setCols}
              min={0}
              max={100}
            />
            <Input
              name="Число найближчих значень"
              value={numClosest}
              setValue={setNumClosest}
              min={0}
            />
          </div>
          <button className="generate-button" onClick={handleGenerate}>
            Згенерувати матрицю
          </button>
        </div>
      </div>

      {matrix.length > 0 && (
        <div>
          <p>Клікніть на клітинку, щоби збільшити її значення на 1.</p>
          <MatrixTable
            matrix={matrix}
            setMatrix={setMatrix}
            setRows={setRows}
            numClosest={numClosest}
          />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
