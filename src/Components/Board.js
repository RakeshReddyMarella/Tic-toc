import React from "react";
import Square from "./Square";

const Board = function(props) {
  const renderSquare = i => {
    return (
      <Square
        value={props.Squares[i]}
        handleClicksquare={() => {
          props.handleClicksquare(i);
        }}
      />
    );
  };

  return (
    <div className="board">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
};

export default Board;
