import { SET_PROJECTS } from "../constants";
const defaultState = { loaded: false };

export const activeProjects = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { loaded: true, info: action.payload };
    default:
      return state;
  }
};
