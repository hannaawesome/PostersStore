import React, {Component} from 'react';
import AccountDetails from "../../components/acountDetails";
import OrderListUser from "../../components/orderListUser";
import Login from "../login";
import {useHistory} from "react-router-dom";

export default function Account(){
    // let history = useHistory();
    // function redirectLogin() {
    //     history.push("/log_in");
    // }
    // const [email] = React.useState(
    //     localStorage.getItem("userEmail")
    // );
    // if (email!==""&&email!==null) {
    //    sessionStorage.setItem("userEmail",email);
            return (<div>
                    <h5>MyAccount</h5>
                    <AccountDetails/>
                    <h5>OrderList</h5>
                    <OrderListUser/>
                </div>
            );
}
