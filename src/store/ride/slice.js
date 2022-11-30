import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRides: null,
  rideDetails: null,
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
    setRideDetails: (state, action) => {
      state.rideDetails = action.payload;
    },
  },
});

export const { setAllRides, postRides, setRideDetails } = rideSlice.actions;

export default rideSlice.reducer;
