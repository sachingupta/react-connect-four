export type Player = 'red' | 'yellow' | null;
export type Board = Player[][];

export const ROWS = 6;
export const COLS = 7;

export const createBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

export const dropPiece = (board: Board, col: number, currentPlayer: Player): Board | null => {
  const newBoard = board.map(row => [...row]);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!newBoard[row][col]) {
      newBoard[row][col] = currentPlayer;
      return newBoard;
    }
  }
  return null; // Column is full
};

export const checkWin = (board: Board, lastRow: number, lastCol: number, currentPlayer: Player): boolean => {
  // Check horizontal
  let count = 0;
  for (let c = Math.max(0, lastCol - 3); c <= Math.min(COLS - 1, lastCol + 3); c++) {
    if (board[lastRow][c] === currentPlayer) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  // Check vertical
  count = 0;
  for (let r = Math.max(0, lastRow - 3); r <= Math.min(ROWS - 1, lastRow + 3); r++) {
    if (board[r][lastCol] === currentPlayer) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  // Check diagonal (top-left to bottom-right)
  count = 0;
  for (let i = -3; i <= 3; i++) {
    const r = lastRow + i;
    const c = lastCol + i;
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  // Check anti-diagonal (top-right to bottom-left)
  count = 0;
  for (let i = -3; i <= 3; i++) {
    const r = lastRow + i;
    const c = lastCol - i;
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
      count++;
      if (count === 4) return true;
    } else {
      count = 0;
    }
  }

  return false;
};

export const checkDraw = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};