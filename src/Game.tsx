import { useCallback, useState } from "react";
import { GameBoard } from "./GameBoard";
import { Board, Player, checkDraw, checkWin, createBoard, dropPiece } from "./gameLogic";
import './Game.css';

export function Game() {
    const [board, setBoard] = useState<Board>(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('red');
    const [winner, setWinner] = useState<Player | null>(null);
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const handleDrop = useCallback((col: number) => {
        if (winner || isDraw) {
          return;
        }
    
        const newBoard = dropPiece(board, col, currentPlayer);
        if (newBoard) {
          setBoard(newBoard);
          const lastRow = newBoard.findIndex(row => row[col] === currentPlayer);
          if (lastRow !== -1 && checkWin(newBoard, lastRow, col, currentPlayer)) {
            setWinner(currentPlayer);
          } else if (checkDraw(newBoard)) {
            setIsDraw(true);
          } else {
            setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
          }
        }
      }, [board, currentPlayer, winner, isDraw]);
    
    return (
        <div className="connect-four-board">
            <h2>Connect Four</h2>
            {winner && <div className="message">Winner: {winner}</div>}
            {isDraw && <div className="message">It's a Draw!</div>}
            {!winner && !isDraw && <div className="message">Current Player: {currentPlayer}</div>}
            <GameBoard board={board} onCellClick={handleDrop} />
        </div>

    );
}