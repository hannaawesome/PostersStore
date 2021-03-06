import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const GroupsMenu = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [email] = React.useState(sessionStorage.getItem("userEmail"));
    const [category] = React.useState(sessionStorage.getItem("userCategory"));

    const nameRef = React.createRef();
    const getChatrooms = () => {
        axios
            .get("/get_chatrooms" //{
                //headers: {
                 //   Authorization: "Bearer " + sessionStorage.getItem("userCategory"),
               // },
           // }
            )
            .then((response) => {
                setChatrooms(response.data);
            })
            .catch((err) => {
                setTimeout(getChatrooms, 3000);
            });
    };

    React.useEffect(() => {
        getChatrooms();
        // eslint-disable-next-line
    }, []);
    const registerChatroom = (props) => {
        const name = nameRef.current.value;

        axios
            .post("/add_chatroom", {
                headers: {
                    authorization: email+" "+category,
                },
                name,
            })
            .then((response) => {

                getChatrooms();

                console.log("success");
            })
            .catch((err) => {
                 console.log(err);
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    console.log("error");
            });
    };

    return (
        <div className="card">
            <div className="cardHeader">Chatrooms</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        placeholder="ChatterBox Nepal"
                        ref={nameRef}
                    />
                </div>
            </div>
            {category==="Admin"? <button onClick={registerChatroom}>Create Chatroom</button>:null}
            <div className="chatrooms">
                {chatrooms.map((chatroom) => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={"/chatroom/" + chatroom._id}>
                            <div className="join">Join</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupsMenu;
