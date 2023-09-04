import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

import { SET_PROJECTS, SET_PROJECT } from "./constants";

import { setProjectAction, setProjectsAction } from "./actions";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export {
  store,
  SET_PROJECTS,
  SET_PROJECT,
  setProjectAction,
  setProjectsAction,
};
