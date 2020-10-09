import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import {Navbar,Nav} from "react-bootstrap"
import heart from "./components_images/heart.png";
import exit from "./components_images/exit.png";
import shoppingCart from "./components_images/shopping-cart.png";
import {useGoogleLogout} from "react-google-login";


export default function NavigationBar({category}) {
    let history = useHistory();
        const [checkedRemember] =React.useState(JSON.parse(localStorage.getItem("checked")));
        const [connectByGoogle]=React.useState(JSON.parse(localStorage.getItem("connectedByGoogle")));
       // const [category,setCategory] = React.useState(sessionStorage.getItem("userCategory"));
   // const [email] = React.useState(sessionStorage.getItem("userEmail"));
        if(checkedRemember){
           // setCategory(localStorage.getItem("userCategory"));
             category=localStorage.getItem("userCategory");
        sessionStorage.setItem("userCategory",category);
            sessionStorage.setItem("userEmail", localStorage.getItem("userEmail"));
        }

    function redirectStore(e) {
        history.push("/store");
    }

    function redirectContact(e) {
        history.push("/contact");
    }

    function redirectLiked(e) {
        history.push("/liked");
    }

    function redirectAccount(e) {

        if (sessionStorage.getItem("userEmail")!==""&&sessionStorage.getItem("userEmail")!==null)
            {
                history.push("/account");
            }
            else history.push("/log_in", { from: 'anywhere' } )
    }

    function redirectCart(e) {
        history.push("/cart");
    }


    function redirectUsers(e) {
        history.push("/users");
    }

    function redirectOrderList(e) {
        history.push("/order_list");
    }

    function redirectStock(e) {
        history.push("/stock");
    }


    function redirectHome(e) {
        history.push("/");
    }
    function redirectChat(e) {
        history.push("/groups_menu");
    }
    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
        sessionStorage.setItem("userEmail","");
        sessionStorage.setItem("userCategory","");
        history.push("/");
    };

    const onFailure = (err) => {
        console.log(err);
    };
    const clientId="142120254422-j6pkdhtomqv3oqjrcgakbkuv21pk8lk7.apps.googleusercontent.com";
    function onLogout(e) {
           sessionStorage.setItem("userEmail","");
           sessionStorage.setItem("userCategory","");
           history.push('/');
    }
    const { logOutGoogle } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });
        console.log(category);
    //connectByGoogle?logOutGoogle:
    switch (category) {
        case "Admin":
            return (
                <React.Fragment>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectUsers}>Users</Nav.Link>
                            <Nav.Link onClick={redirectOrderList}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock}>Stock</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>

                            <Nav.Link onClick={onLogout}>
                                <img alt="" src={exit} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        case "Employee":
            return (
                <React.Fragment>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectOrderList}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock}>Stock</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>

                            <Nav.Link onClick={onLogout}>
                                <img alt="" src={exit} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        case"Customer":
            return (
                <React.Fragment>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={onLogout}>
                                <img alt="" src={exit} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        default:
            return (
                <div>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
            );
    }

 }
