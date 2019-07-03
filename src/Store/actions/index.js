const CLICK_SQUARE = "CLICK_SQUARE";
const JUMP_BACK = "JUMP_BACK";

export const clickSquareAction = (newSqaures, stepnumberupdate) => ({
  type: CLICK_SQUARE,
  payload: {
    newSqaures,
    stepnumberupdate
  }
});

export const jumpBackAction = step => ({
  type: JUMP_BACK,
  payload: {
    stepnumber: step,
    xIsNext: step % 2 === 0
  }
});
