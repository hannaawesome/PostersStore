import React from "react";
import HomePage from '../pages/home'
import Header from "./header";
import {Route, Switch, useHistory} from "react-router-dom";
//import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Account from "../pages/account";
import Register from "../pages/register";
//import "tabler-react/dist/Tabler.css";
import NavigationBar from "./NavigationBar";
import makeToast from "../Toaster";
import io from "socket.io-client";
import Cart from "../pages/cart";
import Login from "../pages/login";
import Liked from "../pages/liked";
import Contact from "../pages/contact";
import Store from "../pages/Store";
import UpdateUserDetails from "../pages/updateUserDetails";
import OrderList from "../pages/orderLists";
import Stock from "../pages/stock";
import PosterData from "../pages/poster";
//import ForgotPassword from "../pages/forgotPassword";
import UsersData from "../pages/users";
import GroupsMenu from "../pages/groupsMenu"
import Chatroom from "../pages/chatRoom"
import {Error404Page} from "tabler-react";

import About from "./about";
import ForgotPassword from "../pages/forgotPassword";
import AddPoster from "../pages/addPoster";
import RegisterByAdmin from "../pages/addUserByAdmin";

export default function App(props: Props): React.Node {


    const [socket, setSocket] = React.useState(null);
    const setupSocket = () => {
        const token = sessionStorage.getItem("userCategory");
        if (token && !socket) {
            const newSocket = io(window.location.href, {
                query: {
                    token: sessionStorage.getItem("userCategory"),
                    userId: sessionStorage.getItem("userEmail")
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
   if( sessionStorage.getItem("userCategory")===undefined)
        sessionStorage.setItem("userCategory","");
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact from="/" render={(props) => <div>
                    <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                
                    <HomePage{...props}/>
                </div>}/>
                <Route exact path="/account" render={(props) =>
                    <div>
                        
                             <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                         <Account{...props} />
                    </div>}/>
                <Route exact from="/register" render={() =>
                    <div>
                        
                            <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                        <Register setupSocket={setupSocket}/>
                    </div> } />
                    <Route exact from="/cart" render={(props) =>
                        <div>
                        
                            <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                              <Cart{...props} />
                        </div>} />
                    <Route path="/log_in" render={() =><div>
                        
                            <NavigationBar/>
                        
                         <Login setupSocket={setupSocket} />
                    </div>} exact/>
                    <Route exact from="/liked" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                              <Liked{...props} />
                        </div>} />
                    <Route exact from="/contact" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                            <Contact {...props} />
                        </div> }/>
                    <Route exact from="/store" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                             <Store{...props} />
                        </div>} />
                    <Route exact from="/users" render={(props) =>
                        <div>
                            <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                             <UsersData{...props} />
                        </div>} />
                    <Route exact from="/user_edit" render={(props) =>
                        <div>
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            <UpdateUserDetails{...props} />
                        </div>} />
                    <Route exact from="/order_list" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                            <OrderList{...props} />
                        </div>} />
                    <Route exact from="/stock" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                            <Stock{...props} />
                        </div>} />
                    <Route exact from="/poster/:posterId" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                              <PosterData{...props} />
                        </div>} />} />
                    <Route exact from="/forgot_password" render={(props) =>
                        <div>
                            
                                <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                            
                            <ForgotPassword{...props} />
                        </div>} />
                    <Route path="/groups_menu" render={() =>
                        <div>
                        
                        <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                            <GroupsMenu socket={socket} />
                        </div>
                        } exact/>
                    <Route path="/chatroom/:id" render={() =>
                        <div>
                        
                        <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                             <Chatroom socket={socket} />
                        </div>}
                    exact/>
                <Route path="/add_poster" render={() =>
                    <div>
                        
                            <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                         <AddPoster />
                    </div>}
                       exact/>
                <Route path="/add_user" render={() =>
                    <div>
                        
                            <NavigationBar category={sessionStorage.getItem("userCategory")}/>
                        
                         <RegisterByAdmin socket={socket} />
                    </div>}
                       exact/>
                    <Route render={(props) =><Error404Page/>} />
                    </Switch>
                    <About/>
                    </div>
                    );
                    }
