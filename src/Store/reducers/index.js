const initialstate = {
  history: [{ Sqaures: Array(9).fill(null) }],
  xIsNext: true,
  stepnumber: 0
};

const addArrayonClick = function(state = initialstate, action) {
  let { history, xIsNext, stepnumber } = state;
  history = history.slice(0, stepnumber + 1);
  switch (action.type) {
    case "CLICK_SQUARE":
      return {
        history: history.concat([{ Sqaures: action.payload.newSqaures }]),
        stepnumber: action.payload.stepnumberupdate,
        xIsNext: !xIsNext
      };

    case "JUMP_BACK":
      return {
        ...state,
        stepnumber: action.payload.stepnumber,
        xIsNext: action.payload.xIsNext
      };

    default:
      return state;
  }
};

export default addArrayonClick;
