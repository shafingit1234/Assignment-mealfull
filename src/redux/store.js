import { configureStore } from "@reduxjs/toolkit";
import operationOnDataReducer from "./slices/operationOnDataSlice";
export default configureStore({
  reducer: {
    operationOnDataReducer,
  },
});
