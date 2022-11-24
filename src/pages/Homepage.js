import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Homepage.css";
import RoutePoints from "../components/RoutePoints";

const Homepage = () => {
  const mapElement = useRef();
  // const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(4.903);
  const [latitude, setLatitude] = useState(52.3681);
  const convertToPoints = (lnglat) => {
    return {
      point: {
        latitude: lnglat.lat,
        longitude: lnglat.lng,
      },
    };
  };

  return (
    <Container>
      <h1>display maps using api here</h1>
      <div className="searchBar">
        <label>
          from:
          <input
            type="text"
            value={latitude}
            placeholder="Enter pickUp location"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="text"
            value={longitude}
            placeholder="Where to? "
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>
      <MapContainer
        style={{ height: "600px" }}
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
    </Container>
  );
};
export default Homepage;

const Container = styled.div`
  margin: 20px;
`;
