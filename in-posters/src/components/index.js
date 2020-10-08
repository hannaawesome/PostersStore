import React, { useContext, useState } from "react";
import HomePage from '../pages/home'
import Header from "./header";
import About from "./about";
import { Route, Switch } from "react-router-dom";
//import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";
import Account from "../pages/account";
import {Button, ForgotPasswordPage, LoginPage} from "tabler-react";
import Liked from "../pages/liked";
import Contact from "../pages/contact";
import Cart from "../pages/cart";
import Register from "../pages/register";
import UsersData from "../pages/users";
import Store from "../pages/Store";
import GroupsMenu from "../pages/groupsMenu"
import {Container} from "@material-ui/core";
import "tabler-react/dist/Tabler.css";
import {Navbar,Nav, NavDropdown} from "react-bootstrap"
import {
    Error400,
    Error401,
    Error403,
    Error404,
    Error500,
    Error503,
    Empty
} from "../pages/Errors";
import UpdateUserDetails from "../pages/updateUserDetails";
import OrderList from "../pages/orderLists";
import PosterEdit from "../pages/posterEdit";
import Stock from "../pages/stock";
import PosterData from "../pages/poster";
import Checkout from "../pages/checkout";
import Login from "../pages/login";
import NavigationBar from "./NavigationBar";
import makeToast from "../Toaster";
import io from "socket.io-client";
import Chatroom from "../pages/chatRoom";


export default function App(props: Props): React.Node {
    const [socket, setSocket] = React.useState(null);

    const setupSocket = () => {
        const token = sessionStorage.getItem("userCategory");
        if (token && !socket) {
            const newSocket = io("http://localhost:8000", {
                query: {
                    token: sessionStorage.getItem("userCategory"),
                },
            });

            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "Socket Disconnected!");
            });

            newSocket.on("connect", () => {
                makeToast("success", "Socket Connected!");
            });

            setSocket(newSocket);
        }
    };

    React.useEffect(() => {
        setupSocket();
        //eslint-disable-next-line
    }, []);
    let history = useHistory();
    function redirectStore(e) {
        history.push("/store");
    }

    return (

        <div>
            <Header/>
            <Toolbar>
               <NavigationBar/>
            </Toolbar>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact from="/400" render={(props) =><Error400{...props} />} />
                <Route exact from="/401" render={(props) =><Error401{...props} />} />
                <Route exact from="/403" render={(props) =><Error403{...props} />} />
                <Route exact from="/404" render={(props) =><Error404{...props} />} />
                <Route exact from="/500" render={(props) =><Error500{...props} />} />
                <Route exact from="/503" render={(props) =><Error503{...props} />} />
                <Route exact path="/account" render={(props) =><Account{...props} />} />
                <Route exact from="/register" render={(props) =><Register{...props} />} />
                <Route exact from="/cart" render={(props) =><Cart{...props} />} />
                <Route path="/log_in" render={() => <LoginPage setupSocket={setupSocket} />} exact/>
                <Route exact from="/empty_page" render={(props) =><Empty{...props} />} />
                <Route exact from="/liked" render={(props) =><Liked{...props} />} />
                <Route exact from="/contact" render={(props) => <Contact {...props} />}/>
                <Route exact from="/store" render={(props) =><Store{...props} />} />
                <Route exact from="/poster_edit" render={(props) =><PosterEdit{...props} />} />
                <Route exact from="/users" render={(props) =><UsersData{...props} />} />
                <Route exact from="/user_edit" render={(props) =><UpdateUserDetails{...props} />} />
                <Route exact from="/order_list" render={(props) =><OrderList{...props} />} />
                <Route exact from="/stock" render={(props) =><Stock{...props} />} />
                <Route exact from="/checkout" render={(props) =><Checkout{...props} />} />
                <Route exact from="/poster" render={(props) =><PosterData{...props} />} />
                <Route exact from="/forgot_password" render={(props) =><ForgotPasswordPage{...props} />} />
                <Route
                    path="/groups_menu"
                    render={() => <GroupsMenu socket={socket} />}
                    exact
                />
                <Route
                    path="/chatroom/:id"
                    render={() => <Chatroom socket={socket} />}
                    exact
                />

                <Route render={(props) =>Error404} />
            </Switch>
            <About/>
        </div>
    );
}
