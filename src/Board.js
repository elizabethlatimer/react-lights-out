import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.9 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let rows = 0; rows < nrows; rows++) {
      let newRow = [];
      for (let columns = 0; columns < ncols; columns++) {
        let colVal = Math.random() > chanceLightStartsOn ? false : true;
        newRow.push(colVal);
      }
      initialBoard.push(newRow);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let rows = 0; rows < nrows; rows++) {
      for (let columns = 0; columns < ncols; columns++) {
        if (board[columns][rows] === true) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard); //above
      flipCell(y + 1, x, newBoard); //below
      flipCell(y, x - 1, newBoard); //left
      flipCell(y, x + 1, newBoard); //right
      // TODO: return the copy
      return newBoard;
    });
  }
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        <h1>Congrats! You won!</h1>
      </div>
    )
  }
  // make table board

  return (
    <div>
      <table>
        <tbody>
          {board.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => (
            <Cell
              flipCellsAroundMe={() => flipCellsAround(`${ri}-${ci}`)}
              isLit={cell}
              key={`${ri}-${ci}`}
              dataid={`${ri}-${ci}`}
            />
          ))}</tr>)}
        </tbody>
      </table>
    </div>
  )
  // TODO
}

export default Board;
