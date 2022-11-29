import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRides: null,
};

export const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setAllRides: (state, action) => {
      state.allRides = action.payload;
    },
    postRides: (state, action) => {
      state.ride.allRides.push(action.payload);
    },
  },
});

export const { setAllRides, postRides } = rideSlice.actions;

export default rideSlice.reducer;
