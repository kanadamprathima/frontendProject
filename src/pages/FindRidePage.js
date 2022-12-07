import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides, fetchRideDetails } from "../store/ride/thunks";
import { selectRides } from "../store/ride/selectors";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { deleteRide } from "../store/user/thunks";
import { selectToken, selectUserId } from "../store/user/selectors";

const FindRidePage = () => {
  const dispatch = useDispatch();
  const rides = useSelector(selectRides);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  console.log("object", userId);
  // console.log(" rides list ", rides);
  useEffect(() => {
    dispatch(fetchAllRides());
  }, []);

  const onDelete = (id) => {
    dispatch(deleteRide(id));
  };

  if (!rides) return <div>Loading...</div>;
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {rides.map((ride, index) => {
        return (
          <div key={index}>
            <div className="card">
              <h2 className="h2">Driver:{ride.user?.name}</h2>
              <p className="h3">seats available: {ride.amount}</p>
              <MapContainer
                style={{ height: "350px", width: "350px" }}
                center={[ride.pickuplat, ride.pickuplong]}
                zoom={11}
                scrollWheelZoom={false}
                onClick={(e) => console.log(e)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[ride.pickuplat, ride.pickuplong]}>
                  <Popup>Point A - Pickup</Popup>
                </Marker>
                <Marker position={[ride.droplat, ride.droplong]}>
                  <Popup>Point B - DropBy</Popup>
                </Marker>
              </MapContainer>
              <div>
                <Link to={`/rides/${ride.id}`}>
                  <button className="btn btn-primary" style={{ width: 150 }}>
                    View details
                  </button>
                  {"   "}
                </Link>
                <br />
                {token && ride.userId !== userId ? (
                  <button className="btn btn-success" style={{ width: 150 }}>
                    Join Ride
                  </button>
                ) : (
                  ""
                )}
              </div>
              <br />
              {token && ride.userId === userId ? (
                <button
                  className="btn btn-primary"
                  style={{ width: 190 }}
                  onClick={() => onDelete(ride.id)}
                >
                  Delete Your Ride
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FindRidePage;
