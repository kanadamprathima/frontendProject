import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addRide } from "../store/ride/thunks";

import { useMap } from "react-leaflet/hooks";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

// import axios from "axios";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import axios from "axios";
import { apiUrl } from "../config/constants";
// import { google } from "leaflet-control-geocoder/dist/geocoders";
const FindRide = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // const [time, setTime] = useState("");
  const [amount, setAmount] = useState(0);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  console.log("origin refere", originRef);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();
  const center = { lat: 48.8584, lng: 2.2945 };
  function MyComponent() {
    const map = useMap();
    console.log("map center:", map.getCenter());
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "input form values",
      from.lat,
      from.lon,
      to.lat,
      to.lon,
      amount,
      date
    );
    dispatch(addRide(from.lat, from.lon, to.lat, to.lon, amount, date));
    if (from.lat || from.lon || to.lat || to.lon || amount || date) {
      setSubmitted(true);
    }
    setDate("");
    setFrom(" ");
    setTo("");
    setAmount(" ");
  };

  function onPlaceSelectFrom(value) {
    console.log("on place  from select", value);
    setFrom({
      lat: value.properties.lat,
      lon: value.properties.lon,
      name: value.properties.address_line1,
    });
  }
  function onPlaceSelectTo(value) {
    // console.log("on place selectto", value);
    // console.log("form useState", to);
    setTo({
      lat: value.properties.lat,
      lon: value.properties.lon,
      name: value.properties.address_line1,
    });
  }

  function onSuggectionChange(value) {
    // console.log("on suggesion change", value);
  }
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h3 className="h3">Published your ride</h3>
      </div>
    );
  };

  const calculateRouteAPI = async () => {
    const response = await axios.get(
      `${apiUrl}/table/v1/{osrm-extract:"car"}/{coordinates:[latitude,longitude]}?{sources}&{destinations}=[{
      }]&annotations={duration|distance|duration,distance}`
    );
    console.log("res from calculate route api", response);
  };
  useEffect(() => {
    calculateRouteAPI();
  }, []);
  return (
    <div
      style={{
        width: "500px",
        height: "600",
        backgroundColor: "ghostwhite",
        marginTop: "5%",
      }}
    >
      <GeoapifyContext apiKey="f499725a973c4152bbc5edaadb541dc4">
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter pickup address here"
                value={from.name}
                placeSelect={onPlaceSelectFrom}
                suggestionsChange={onSuggectionChange}
                ref={originRef}
              />

              <br />
              <GeoapifyGeocoderAutocomplete
                placeholder="Enter drop address here"
                value={to.name}
                placeSelect={onPlaceSelectTo}
                suggestionsChange={onSuggectionChange}
                ref={destinationRef}
                className="form-control"
              />
              <br />
            </div>
            <label>
              Schedule date & startTime :{"   "}
              <input
                className="form-control"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />{" "}
            </label>{" "}
            {"   "}
            <br />
            <label>
              No.of Seats:
              <input
                type="number"
                placeholder="enter number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </label>
            <br />
            <button
              className="btn btn-success"
              type="submit"
              onClick={calculateRouteAPI}
            >
              Calculate Route
            </button>
            <p>distance:{distance}</p>
            <p>Duration:{duration}</p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => dispatch(addRide)}
            >
              Publish Your Ride
            </button>
            <div className="messages">{successMessage()}</div>
          </form>
        </div>
      </GeoapifyContext>
      <div>
        {/* once user selects point A, show the map */}
        {/*<MapContainer
          style={{ height: "600px" }}
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          onClick={(e) => console.log(e)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} />
          {/* {directionsResponse && < directions={directionsResponse} />} */}
        {/* </MapContainer> */}
      </div>
    </div>
  );
};
export default FindRide;
