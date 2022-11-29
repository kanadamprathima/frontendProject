import { useState } from "react";
import { useMapEvent, Marker } from "react-leaflet";
import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
//const routeControl = useRef();

const RoutePoints = () => {
  // const getAddress = (lat, lng) => {
  //   const geocoder = L.Control.Geocoder.nominatim();
  //   return new Promise((resolve, reject) => {
  //     geocoder.reverse({ lat, lng }, mapRef.current.getZoom(), (results) =>
  //       results.length ? resolve(results[0].name) : reject(null)
  //     );
  //   });
  // };
  const [points, setPoints] = useState([]);
  const map = useMapEvent("click", (e) => {
    console.log(e);
    L.Routing.control({
      waypoints: [
        L.latLng(52.3681, 4.903),
        L.latLng(e.latlng.lat, e.latlng.lng),
      ],
      routeWhileDragging: true,
    }).addTo(map);
    // const address = getAddress(e.latlng.lat, e.latlng.lng);
    // console.log(address);
    setPoints([...points, e.latlng]);
  });

  return (
    <>
      {points.map((point, i) => {
        // console.log(point);
        return <Marker key={i} position={point}></Marker>;
      })}
    </>
  );
};

export default RoutePoints;
