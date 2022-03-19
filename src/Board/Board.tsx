import React, { Component, useState, useEffect } from 'react';
import './Board.css';
import { GameInfo, GameState, Piece } from '../Game/types';

interface BoardPieceProps {
  color: string;
  column: number;
  row: number;
  gameInfo: GameInfo;
}

// TODO(3): style the game board
// - since pieces are dropped from the top, how can we animate that?
// - how would gravity affect a still-dropped piece?
// - how does the distance dropped affect the time it takes to land?
// - there is some boiler plate here to help, but feel free to go with a different approach if you are more comfortable
function BoardPiece(props: BoardPieceProps) {
  const { color, column, row, gameInfo } = props;

  const [isDropped, setIsDropped] = useState(false);

  const baseStyle = {
    color,
    top: 0,
    left: `${(column / gameInfo.columnCount) * 100}%`,
    height: `${(1 / gameInfo.rowCount) * 100}%`,
    width: `${(1 / gameInfo.columnCount) * 100}%`,
  };

  const droppedStyle = {
    ...baseStyle,
    top: `${100 - ((row + 1) / gameInfo.rowCount) * 100}%`,
  };

  // change the style chosen after it initially renders
  useEffect(() => {
    if (!isDropped) {
      setIsDropped(true);
    }
  }, [isDropped]);

  return (
    <div className='Board-Piece' style={isDropped ? droppedStyle : baseStyle} />
  );
}

interface BoardProps {
  gameInfo: GameInfo;
  gameState: GameState;
  placePiece: (column: number, row: number) => void;
}

export class Board extends Component<BoardProps> {
  getPieceColor = (piece: Piece, gameInfo: GameInfo) => {
    const isPlayerOne = piece.playerName === gameInfo.playerOneName;

    return isPlayerOne ? 'red' : 'green';
  };

  render() {
    const { gameInfo, gameState } = this.props;

    return (
      <div
        className='Board'
        style={{
          width: gameInfo.columnCount * 50,
          height: gameInfo.rowCount * 50,
        }}
      >
        {/** TODO(2): placing game pieces
         * - how do utilize the provided board piece component to visualize the game state?
         */}
        {gameState.pieces.map((piece, i) => (
          <BoardPiece
            key={i}
            column={piece.column}
            row={piece.row}
            gameInfo={gameInfo}
            color={this.getPieceColor(piece, gameInfo)}
          />
        ))}
        {Array.from(Array(gameInfo.rowCount), (e, row) => (
          <div key={`row-${row}`} className='Board-Row'>
            {Array.from(Array(gameInfo.columnCount), (e, column) => (
              <div
                key={`slot-${column}-${row}`}
                className='Board-Slot'
                onClick={() =>
                  this.props.placePiece(column, gameInfo.rowCount - row - 1)
                }
              >
                ({row}, {column})
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
