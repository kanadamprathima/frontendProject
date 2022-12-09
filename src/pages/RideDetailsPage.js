import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectDetails } from "../store/ride/selectors";
import { fetchRideDetails } from "../store/ride/thunks";
import { Link } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");
const RideDetailsPage = () => {
  const { id } = useParams();
  const [message, setmessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_msg", { message, room });
    console.log("socket msg", message);
  };
  useEffect(() => {
    socket.on("receive_msg", (data) => {
      // alert(data.message);
      console.log("receivedmsg", data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);
  const dispatch = useDispatch();
  const rideDetails = useSelector(selectDetails);
  // console.log("details page ride", rideDetails);
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
        <h4 className="h4">
          {rideDetails.id}.DriverName:{rideDetails.user?.name}
        </h4>
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
        <input
          placeholder="Room Number..."
          className="form-control"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom} className="btn btn-warning">
          {" "}
          Join Room
        </button>
        <input
          placeholder="msg"
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="form-control"
        />
        <button onClick={sendMessage} className="btn btn-warning">
          send msg
        </button>
        <h1>
          message:
          {messageReceived}
        </h1>
      </div>
    </div>
  );
};
export default RideDetailsPage;
