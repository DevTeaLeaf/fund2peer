const defaultState = {
  cash: 0,
};

const CASE_1 = "CASE_1";
const CASE_2 = "CASE_2";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CASE_1:
      return { ...state, cash: state.cash + action.payload };
    case CASE_2:
      return { ...state, cash: state.cash - action.payload };
    default:
      return state;
  }
};
