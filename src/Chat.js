import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./css/chat.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [SEED, setSEED] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name)
      })
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [roomId])

  useEffect(() => {
    setSEED(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed " + input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  };

  // UI
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${SEED}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {""}
            {
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()
            }</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((msg) => (
          <p className={`chat__message ${msg.name === user.displayName && "chat__reciever"}`}>
            <span className="chat__name">{msg.name}</span>
            {msg.message}
            <span className="chat__timestamp">{new Date(msg.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage} />
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
