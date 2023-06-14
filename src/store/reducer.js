const defaultState = { loaded: false };

export const SET_PROJECTS = "SET_PROJECTS";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { loaded: true, info: action.payload };
    default:
      return state;
  }
};
