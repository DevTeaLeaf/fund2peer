import { SET_PROJECTS, SET_PROJECT } from "../constants";

const setProjectsAction = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

const setProjectAction = (project) => ({
  type: SET_PROJECT,
  payload: project,
});

export { setProjectAction, setProjectsAction };
