import { Cell } from "./Cell";
import { Board } from "./gameLogic"
import './Game.css';

export function GameBoard({board, onCellClick}: { board: Board, onCellClick: (col: number) => void}) {
    return (
        <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                value={cell}
                onClick={() => onCellClick(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
}