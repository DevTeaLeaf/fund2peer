import { configureStore } from "@reduxjs/toolkit";
import { reducer, SET_PROJECTS } from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export { store, SET_PROJECTS };
