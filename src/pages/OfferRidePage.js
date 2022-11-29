import FindRide from "../components/FindRide";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RoutePoints from "../components/RoutePoints";

import { useState } from "react";
const OfferRidePage = () => {
  const [latitude, setLatitude] = useState(52.3681);
  const [longitude, setLongitude] = useState(4.903);
  // const [pickup, setPickup] = useState([52.3681, 4.903]);
  // const [dropOff, setDropOff] = useState([50.3681, 3.903]);
  const [rideInfo, setRideInfo] = useState({});

  return (
    <div className="container ">
      <div
        className="card"
        style={{
          boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .2)",
          boxSizing: "content-box",
        }}
      >
        <h2>publish ride</h2>

        <FindRide />
      </div>
      <br />
      {/* 1- The whole Map Component becomes another component, to be called inside the FindRide */}
      <MapContainer
        style={{ height: "700px" }}
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        onClick={(e) => console.log(e)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutePoints />

        <Marker position={[latitude, longitude]}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default OfferRidePage;
