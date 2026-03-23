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

  const handleGenerate = () => {
    setMatrix(generateMatrix(rows, cols));
  };

  return (
    <div>
      <div className="container">
        <h1>Matrix App</h1>
        <div>
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
              name="Кількість найближчих значень"
              value={numClosest}
              setValue={setNumClosest}
              min={0}
            />
          </div>
          <button onClick={handleGenerate}>Згенерувати</button>
        </div>
      </div>

      <MatrixTable
        matrix={matrix}
        setMatrix={setMatrix}
        numClosest={numClosest}
      />
    </div>
  );
}

export default App;
