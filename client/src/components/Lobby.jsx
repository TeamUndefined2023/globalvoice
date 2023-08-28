import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import '../styles/lobby.css';
const LobbyScreen = ({setname}) => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div id="bg_lobby">
      <div className="box">
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="email" className="inp">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="name" className="inp">Name</label>
          <input type="text" 
            id="yourname" 
            onChange={(e)=>setname(e.target.value)} 
          />
          <br />
          <label htmlFor="room" className="inp">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button className="btn_join">Join</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;