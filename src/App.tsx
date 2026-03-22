import { useState } from "react";
import { generateMatrix } from "./utils/generateMatrix";
import type { Cell } from "./types/types";
import MatrixTable from "./components/MatrixTable";
import Input from "./components/Input";

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
      <h1>Matrix App</h1>

      <div>
        <Input name="M" value={rows} setValue={setRows} min={0} max={100} />
        <Input name="N" value={cols} setValue={setCols} min={0} max={100} />
        <Input name="X" value={numClosest} setValue={setNumClosest} min={1} />

        <button onClick={handleGenerate}>Generate</button>
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
