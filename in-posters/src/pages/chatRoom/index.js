import React from "react";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Grid from "@material-ui/core/Grid";
import {Dropdown} from "react-bootstrap";
import $ from "jquery";
import PosterViewInShop from "../Store/posterViewInShop";
import MessageView from "./messageView";

const Chatroom = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
  //messagesToShow
  const messageRef = React.useRef();
  const [userEmail, setUserEmail] = React.useState("");
  const [like, setLike] = React.useState(false);
  const [unlike, setUnlike] = React.useState(false);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      setUserEmail(userEmail);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);


  return (
      <div className="chatroomPage">
        <div className="chatroomSection">
          <div className="cardHeader">Chatroom Name</div>
          <div className="chatroomContent">
            {messages.map((message, i) => (
                <MessageView key={i} message={message} />
            ))}
          </div>
          <div className="chatroomActions">
            <div>
              <input
                  type="text"
                  name="message"
                  placeholder="Say something!"
                  ref={messageRef}
              />
            </div>
            <div>
              <button className="join" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default withRouter(Chatroom);
