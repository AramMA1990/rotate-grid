import React, { useState } from "react";
import "./App.css";

function createEmptyMatrix(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
}

function rotateMatrixClockwise(matrix, blackCellsSet, size) {
  let rotatedMatrix = Array.from({ length: size }, () => []);
  let rotatedBlackCells = new Set();

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotatedMatrix[col].push(matrix[row][col]);
      const cellKey = `${row},${col}`;
      if (blackCellsSet.has(cellKey)) {
        const newRow = col;
        const newCol = size - 1 - row;
        rotatedBlackCells.add(`${newRow},${newCol}`);
      }
    }
  }

  return { rotatedMatrix, rotatedBlackCells };
}

export default function App() {
  const [matrixSize, setMatrixSize] = useState(4);
  const [matrix, setMatrix] = useState(createEmptyMatrix(4));
  const [blackCells, setBlackCells] = useState(new Set());

  function toggleCellColor(row, col) {
    const cellKey = `${row},${col}`;
    const updatedBlackCells = new Set(blackCells);

    if (updatedBlackCells.has(cellKey)) {
      updatedBlackCells.delete(cellKey);
    } else {
      updatedBlackCells.add(cellKey);
    }

    setBlackCells(updatedBlackCells);
  }

  function rotateGrid() {
    const { rotatedMatrix, rotatedBlackCells } = rotateMatrixClockwise(matrix, blackCells, matrixSize);
    setMatrix(rotatedMatrix);
    setBlackCells(rotatedBlackCells);
  }

  function handleMatrixSizeChange(event) {
    const newSize = parseInt(event.target.value) || 0;
    setMatrixSize(newSize);
    setMatrix(createEmptyMatrix(newSize));
    setBlackCells(new Set());
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 20 }}>
      <input
        type="number"
        min="1"
        value={matrixSize}
        onChange={handleMatrixSizeChange}
        placeholder="Matrix size"
        className="input"
      />

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${matrixSize}, 50px)`,
          gridTemplateRows: `repeat(${matrixSize}, 50px)`,
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const cellKey = `${rowIndex},${colIndex}`;
            const isBlack = blackCells.has(cellKey);
            return (
              <div
                key={cellKey}
                className={`cell ${isBlack ? "black" : ""}`}
                onClick={() => toggleCellColor(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>

      <button onClick={rotateGrid} className="rotate-button">
        Rotate
      </button>
    </div>
  );
}
