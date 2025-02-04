import { configureStore } from "@reduxjs/toolkit";
import rootSlices from "./rootReducer";

const store = configureStore({
  reducer: rootSlices,
});

export default store;
