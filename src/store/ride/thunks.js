import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/slice";
import { setAllRides, postRides } from "./slice";
//get all rides
export const fetchAllRides = () => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/rides`);
    // console.log("Response fetchAllrides thunks", response.data);

    dispatch(setAllRides(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

//publish a ride.
export const addRide =
  (pickuplat, pickuplong, droplat, droplong, amount, startTime) =>
  async (dispatch, getState) => {
    console.log(
      "req  post thunk",
      pickuplat,
      pickuplong,
      droplat,
      droplong,
      amount,
      startTime
    );
    try {
      const { token } = getState().user;
      const response = await axios.post(
        `${apiUrl}/rides`,
        { pickuplat, pickuplong, droplat, droplong, amount, startTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("post res addridethunk", response.data);
      dispatch(postRides(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
