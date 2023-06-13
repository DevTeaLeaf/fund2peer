import { configureStore } from "@reduxjs/toolkit";
import { reducer, SET_PROJECTS } from "./reducer";

const store = configureStore({
  reducer: reducer,
});

export { store, SET_PROJECTS };
