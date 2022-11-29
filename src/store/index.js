import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import rideReducer from "./ride/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    ride: rideReducer,
  },
});
