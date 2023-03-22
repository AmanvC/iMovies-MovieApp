import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
  },
});
