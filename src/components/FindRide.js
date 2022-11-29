import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRide } from "../store/ride/thunks";
// import axios from "axios";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
const FindRide = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  // const [time, setTime] = useState("");
  const [amount, setAmount] = useState(0);

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
  return (
    <div>
      <GeoapifyContext apiKey="f499725a973c4152bbc5edaadb541dc4">
        <div>
          <form onSubmit={handleSubmit}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter pickup address here"
              value={from.name}
              placeSelect={onPlaceSelectFrom}
              suggestionsChange={onSuggectionChange}
            />
            <br />
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter drop address here"
              value={to.name}
              placeSelect={onPlaceSelectTo}
              suggestionsChange={onSuggectionChange}
            />
            <br />
            <label>
              Schedule date & startTime :{"   "}
              <input
                className="mb-3"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />{" "}
            </label>{" "}
            {"   "}
            {/* <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            /> */}
            <br />
            <label>
              No.of Seats:
              <input
                type="number"
                placeholder="enter number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => dispatch(addRide)}
            >
              Publish
            </button>
          </form>
        </div>
      </GeoapifyContext>

      {/* once user selects point A, show the map */}
    </div>
  );
};
export default FindRide;
