import React from "react";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Grid from "@material-ui/core/Grid";
import {Dropdown} from "react-bootstrap";
import $ from "jquery";

const MessageView = ({ match, socket ,message}) => {
    const [like, setLike] = React.useState(false);
    const [unlike, setUnlike] = React.useState(false);

    function postLike(){
        var data = {
            massageId: message._id,
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
        // React.useEffect(() => {
        //   if (socket) {
        //     socket.on("updateMessage", (message) => {
        //       const uMessages = [...messages, message];
        //       setMessages(uMessages);
        //     });
        //   }
        //   //eslint-disable-next-line
        // }, [messages]);

    }
    function handleLike() {
        if(like)
            setLike(false);
        else {
            setUnlike(false);
            setLike(true);
        }
        postLike();
    }

    function handleUnlike() {
        if(unlike)
            setUnlike(false);
        else {
            setUnlike(true);
            setLike(false);
        }
        postLike();
    }

    return (
                        <React.Fragment>
              <span
                  className={
                      sessionStorage.getItem("userEmail") === message.userEmail ? "ownMessage" : "otherMessage"
                  }
              >
                {message.name}:
              </span>{" "}
                            <Grid container spacing={3}>
                                <Grid item xs={5}>
                                    {message.message}
                                </Grid>
                                <Grid item xs={5}>
                                    {message.likes.length}
                                    <IconButton onClick={handleLike}>
                                        <ThumbUpIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={5}>
                                    {message.unlikes.length}
                                    <IconButton onClick={handleUnlike}>
                                        <ThumbDownIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </React.Fragment>
    );
};

export default withRouter(MessageView);
