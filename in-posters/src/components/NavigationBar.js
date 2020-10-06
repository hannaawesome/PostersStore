import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import {Navbar,Nav, NavDropdown} from "react-bootstrap"
import heart from "./components_images/heart.png";
import exit from "./components_images/exit.png";
import shoppingCart from "./components_images/shopping-cart.png";

export default function NavigationBar() {
    let history = useHistory();
    const [category] = React.useState(localStorage.getItem("userCategory"));
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
        history.push("/account");
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

    function redirectLogout(e) {
        if (localStorage.getItem("userId")!==""&&localStorage.getItem("userId")!==null)
            history.push("/logout");
        else
            history.push("/");
    }
    switch (category) {
        case "Admin":
            return (
                <React.Fragment>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectUsers()}>Users</Nav.Link>
                            <Nav.Link onClick={redirectOrderList()}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock()}>Stock</Nav.Link>
                            <Nav.Link onClick={redirectLogout}>
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
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectOrderList()}>Orders</Nav.Link>
                            <Nav.Link onClick={redirectStock()}>Stock</Nav.Link>
                            <Nav.Link onClick={redirectLogout}>
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
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectLogout}>
                                <img alt="" src={exit} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
        default:
            return (
                <React.Fragment>
                    <Navbar bg="light">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={redirectHome}>Home</Nav.Link>
                            <Nav.Link onClick={redirectStore}>Shop</Nav.Link>
                            <Nav.Link onClick={redirectAccount}>Account</Nav.Link>
                            <Nav.Link onClick={redirectContact}>Contact</Nav.Link>
                            <Nav.Link onClick={redirectLiked}>
                                <img alt="" src={heart} height={20} width={20}/>
                            </Nav.Link>
                            <Nav.Link onClick={redirectCart}>
                                <img alt="" src={shoppingCart} height={20} width={20}/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </React.Fragment>
            );
    }
}
