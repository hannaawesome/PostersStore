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
import heart from "./components_images/heart.png";
import exit from "./components_images/exit.png";
import shoppingCart from "./components_images/shopping-cart.png";
import Login from "../pages/login";
import NavigationBar from "./NavigationBar";


export default function App(props: Props): React.Node {
    let history = useHistory();
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

    function redirectLogin(e) {
        history.push("/log_in");
    }

    function redirectRegister(e) {
        history.push("/register");
    }

    function redirectPosterEdit(e) {
        history.push("/poster_edit");
    }

    function redirectUsers(e) {
        history.push("/users");
    }

    function redirectUserEdit(e) {
        history.push("/user_edit");
    }

    function redirectOrderList(e) {
        history.push("/order_list");
    }

    function redirectStock(e) {
        history.push("/stock");
    }

    function redirectCheckout(e) {
        history.push("/checkout");
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
                <Route exact from="/log_in" render={(props) =><Login{...props} />} />
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

                <Route render={(props) =>Error404} />
            </Switch>
            <About/>
        </div>
    );
}
