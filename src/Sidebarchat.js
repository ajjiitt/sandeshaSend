import React, { useState, useEffect } from "react";
import db from "./firebase";
import "./css/sidebarchat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function Sidebarchat({ addNewChat, id, name }) {
  const [SEED, setSEED] = useState("");

  const [messages, setMessages] = useState("");
  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  useEffect(() => {
    setSEED(Math.floor(Math.random() * 5000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Please Enter Name of Room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
    <div className="sideBarChat">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${SEED}.svg`}
        />

        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
    </div>
      </Link>
  ) : (
    <div onClick={createChat} className="sideBarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default Sidebarchat;
