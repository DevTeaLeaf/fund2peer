import { combineReducers } from "redux";

import { activeProject } from "./activeProject";
import { activeProjects } from "./activeProjects";

const rootReducer = combineReducers({
  project: activeProject,
  projects: activeProjects,
});

export default rootReducer;
