import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectDetails } from "../store/ride/selectors";
import { fetchRideDetails } from "../store/ride/thunks";
import { Link } from "react-router-dom";
const RideDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rideDetails = useSelector(selectDetails);
  console.log("details page ride", rideDetails);
  useEffect(() => {
    dispatch(fetchRideDetails(id));
  }, []);
  if (!rideDetails) return <div>Loading...</div>;
  return (
    <div className="container">
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "4%",
          border: "4px solid ghostWhite",
          boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",
        }}
      >
        <h4 className="h4">DriverName: {rideDetails.user?.name}</h4>
        <p>
          <strong>Seats available:</strong>
          {"  "}
          {rideDetails.amount}
        </p>
        <p>
          {" "}
          <strong>Contact No:</strong>
          {"  "}
          {rideDetails.user?.phone}
        </p>
        <p>
          {" "}
          <strong>starts at :</strong>
          {rideDetails.startTime}
        </p>

        <Link to={"/rides"}>
          <button className="btn btn-primary">Back</button>
        </Link>
        {/* <p>Travelling from :{rideDetails.pickuplat}</p> */}
      </div>
    </div>
  );
};
export default RideDetailsPage;
