import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import {Navbar,Nav} from "react-bootstrap"
import heart from "./components_images/heart.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {useGoogleLogout} from "react-google-login";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";


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
           if(JSON.parse(localStorage.getItem("checked"))) {
               localStorage.setItem("userEmail", "");
               localStorage.setItem("userCategory", "");
               localStorage.setItem("password", "");
           }

           if(JSON.parse(localStorage.getItem("connectedByGoogle")))
               logOutGoogle();
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
                <React.Fragment style={{display: 'flex'}}>
                    <Navbar bg="dark" className="myNavBar">
                        <Nav className="myNav" >
                            <Nav.Link color="white" onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link color="white" onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectUsers}>Users</Nav.Link>
                            <Nav.Link onClick={redirectOrderList}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock}>Stock</Nav.Link>
                             <Nav.Link onClick={redirectLiked}>
                                <BorderHeartIcon style={{fill: "white"}}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <ShoppingCartOutlinedIcon style={{fill: "white"}}/>
                            </Nav.Link>

                            <Nav.Link onClick={onLogout}>
                               <ExitToAppIcon style={{fill: "white"}}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        case "Employee":
            return (
                <React.Fragment>
                    <Navbar bg="dark" varient="dark" justify-content="space-around" display="flex">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectOrderList}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock}>Stock</Nav.Link>
                             <Nav.Link onClick={redirectLiked}>
                                 <BorderHeartIcon style={{fill: "white"}}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <ShoppingCartOutlinedIcon/>
                            </Nav.Link>

                            <Nav.Link onClick={onLogout}>
                                <ExitToAppIcon style={{fill: "white"}}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        case"Customer":
            return (
                <React.Fragment>
                    <Navbar bg="dark" varient="dark" justify-content="space-around" display="flex">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectChat}>Chat</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                             <Nav.Link onClick={redirectLiked}>
                                 <BorderHeartIcon style={{fill: "white"}}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <ShoppingCartOutlinedIcon/>
                            </Nav.Link>
                            <Nav.Link onClick={onLogout}>
                                <ExitToAppIcon style={{fill: "white"}}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        default:
            return (
                <div>
                    <Navbar bg="dark" varient="dark" justify-content="space-around" display="flex">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <ShoppingCartOutlinedIcon/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
            );
    }

 }
