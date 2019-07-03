import React from "react";
import Board from "./Board";
import { connect } from "react-redux";
import { clickSquareAction, jumpBackAction } from "../Store/actions/index";

const Game = props => {
  //handleclick function

  let {
    history,
    stepnumber,
    xIsNext,
    clickSquareAction,
    jumpBackAction
  } = props;

  console.log(history, stepnumber);

  const handleClicksquare = i => {
    let stepnumberupdate = stepnumber;
    history = history.slice(0, stepnumber + 1);

    let current = history[history.length - 1];

    stepnumberupdate = stepnumberupdate + 1;

    let newSqaures = [...current.Sqaures];

    if (calculateWinner(newSqaures) || newSqaures[i]) {
      return;
    }

    newSqaures[i] = xIsNext ? "X" : "O";

    clickSquareAction(newSqaures, stepnumberupdate);
  };

  //jump to function

  const jumpTo = step => {
    console.log(step);
    jumpBackAction(step);
  };

  //let { history, xIsNext } = this.state;

  const current = history[stepnumber];

  //tracking the moves function

  const Moves = history.map((step, move) => {
    const desc = move ? `Go to move #:${move}` : "Go to Start";
    return (
      <li key={move}>
        <button
          onClick={() => {
            jumpTo(move);
          }}
        >
          {desc}
        </button>
      </li>
    );
  });

  //setting the status value
  let status;
  let winner = calculateWinner(current.Sqaures);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player:${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="container">
      <Board
        Squares={current.Sqaures}
        handleClicksquare={i => {
          handleClicksquare(i);
        }}
      />
      <div className="game-info" />
      <div>{status}</div>
      <ol>{Moves}</ol>
    </div>
  );
};

//mapstatetoprops function

const mapStateToProps = state => ({
  history: [...state.history],
  xIsNext: state.xIsNext,
  stepnumber: state.stepnumber
});

//mapDispatchToProps

const mapDispatchToProps = dispatch => ({
  clickSquareAction: (newSqaures, stepnumberupdate) =>
    dispatch(clickSquareAction(newSqaures, stepnumberupdate)),
  jumpBackAction: step => dispatch(jumpBackAction(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

//////helper function to calculate who is the winner

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
