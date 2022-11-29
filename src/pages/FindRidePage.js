import { useEffect } from "react";
import axios from "axios";
import FindRide from "../components/FindRide";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../store/ride/thunks";
import { selectRides } from "../store/ride/selectors";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const FindRidePage = () => {
  const dispatch = useDispatch();
  const rides = useSelector(selectRides);
  // console.log(" rides list ", rides);
  useEffect(() => {
    dispatch(fetchAllRides());
  }, []);

  if (!rides) return <div>Loading...</div>;
  return (
    <div>
      {/* <FindRide /> */}

      {/* <button type="submit" className="btn btn-primary">
        Search
      </button> */}
      {/* <button onClick={convertLatLong}>Convert Test</button> */}
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {rides.map((ride, index) => {
          return (
            <div key={index}>
              <div className="card">
                <h3>Driver:{ride.user?.name}</h3>
                <p>seats available: {ride.amount}</p>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FindRidePage;
