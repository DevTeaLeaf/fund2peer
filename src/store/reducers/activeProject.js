import { SET_PROJECT } from "../constants";

const defaultState = { loaded: false };

export const activeProject = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return { loaded: true, info: action.payload };
    default:
      return state;
  }
};
