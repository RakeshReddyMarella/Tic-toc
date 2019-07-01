import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = function(props) {
  return (
    <button className="square" onClick={props.handleClicksquare}>
      {props.value}
    </button>
  );
};

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
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ Sqaures: Array(9).fill(null) }],
      xIsNext: true,
      stepnumber: 0
    };
  }

  //handleclick function

  handleClicksquare = i => {
    let { history, xIsNext } = this.state;
    let current = history[history.length - 1];
    let stepnumberupdate = this.state.stepnumber;
    stepnumberupdate = stepnumberupdate + 1;

    let newSqaures = [...current.Sqaures];

    if (calculateWinner(newSqaures) || newSqaures[i]) {
      return;
    }

    newSqaures[i] = xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          Sqaures: newSqaures
        }
      ]),
      stepnumber: stepnumberupdate,
      xIsNext: !xIsNext
    });
  };

  //jump to function

  jumpTo(step) {
    console.log(step);
    this.setState({
      stepnumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    let { history, xIsNext } = this.state;

    const current = history[this.state.stepnumber];

    //tracking the moves function

    const Moves = history.map((step, move) => {
      const desc = move ? `Go to move #:${move}` : "Go to Start";
      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
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
            this.handleClicksquare(i);
          }}
        />
        <div className="game-info" />
        <div>{status}</div>
        <ol>{Moves}</ol>
      </div>
    );
  }
}

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

ReactDOM.render(<Game />, document.getElementById("root"));
