const defaultState = [];

export const SET_PROJECTS = "SET_PROJECTS";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    default:
      return state;
  }
};
