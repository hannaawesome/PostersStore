import React, {Component} from 'react';
import AccountDetails from "../../components/acountDetails";
import OrderListUser from "../../components/orderListUser";
import Login from "../login";

export default function Account(){
    const [email] = React.useState(
        localStorage.getItem("userEmail")
    );
    if (email!==""&&email!==null) {
       sessionStorage.setItem("userEmail",email);
            return (<div>
                    <h5>MyAccount</h5>
                    <AccountDetails/>
                    <h5>OrderList</h5>
                    <OrderListUser/>
                </div>
            );
        } else {
            return (<div>
                    <Login/>
                </div>
            );
        }
}
