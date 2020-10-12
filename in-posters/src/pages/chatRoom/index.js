import React from "react";
import {useHistory, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Grid from "@material-ui/core/Grid";

const Chatroom = ({ match, socket }) => {
  let history = useHistory();

  const chatroomId = match.params.id;
  const [messages, setMessages] = React.useState([]);
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
  React.useEffect(() => {
    async function fetchMessages() {
      const fullResponse = await fetch(
          "/get_messages?chatroom="+chatroomId
      );
      const responseJson = await fullResponse.json();
      setMessages(responseJson);
    }

    fetchMessages().then(r => console.log("got"));
  }, []);
  function postLike(messageId){
    var data = {
      massageId: messageId,
      userAdded: sessionStorage.getItem("userEmail"),
      likeStatus: like,
      unlikeStatus: unlike
    };
    // Submit form via jQuery/AJAX
    $.ajax({
      type: "POST",
      url: "/update_like_to_message",
      data: data,
    })
        .done(function(data) {})
        .fail(function() {});


  }
  function handleLike(e,message) {
    if(like)
      setLike(false);
    else {
      setUnlike(false);
      setLike(true);
    }
    postLike(message);
  }

  function handleUnlike(e,message) {
    if(unlike)
      setUnlike(false);
    else {
      setUnlike(true);
      setLike(false);
    }
    postLike(message);
  }
  const backToGroups = () => {history.push("/groups_menu"); };
  return (
      <div className="chatroomPage">
        <div className="chatroomSection">
          <div className="cardHeader">Chatroom Name</div>
          <div className="chatroomContent">
            {messages.map((message, i) => (
                <div key={i} className="message">
           <span
               className={
                userEmail === message.userId ? "ownMessage" : "otherMessage"
               }
           >
                {message.name}:
              </span>{" "}
            <Grid container spacing={3}>
              <Grid item xs={5}>
                {message.message}
              </Grid>
              <Grid item xs={5}>
                {message.likes!==undefined?message.likes.length:0}
                <IconButton onClick={handleLike(message._id)}>
                  <ThumbUpIcon/>
                </IconButton>
              </Grid>
              <Grid item xs={5}>
                {message.unlikes!==undefined?message.likes.length:0}
                <IconButton onClick={handleUnlike(message._id)}>
                  <ThumbDownIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </div> ))}
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
            <button className="join" onClick={backToGroups}>back</button>
          </div>
        </div>
      </div>
  );
};

export default withRouter(Chatroom);
