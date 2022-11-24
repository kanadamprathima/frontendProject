import { useState } from "react";
import { useMapEvent, Marker } from "react-leaflet";

const RoutePoints = () => {
  const [points, setPoints] = useState([]);
  const map = useMapEvent("click", (e) => {
    // console.log(e);
    setPoints([...points, e.latlng]);
    points.Routing.control({
      waypoints: [
        points.latLng(57.74, 11.94),
        points.latLng(e.latlng.lat, e.latlng.lng),
      ],
      routeWhileDragging: true,
    }).addTo(map);
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
