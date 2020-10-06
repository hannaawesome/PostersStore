import React, {Component} from 'react';
import AccountDetails from "../../components/acountDetails";
import OrderList from "../../components/orderList";
import Login from "../login";

export default function Account(){
    const [uId] = React.useState(
        localStorage.getItem("userId")
    );    console.log(uId);
    if (uId!==""&&uId!==null) {
            return (<div>
                    <h5>MyAccount</h5>
                    <AccountDetails/>
                    <h5>OrderList</h5>
                    <OrderList/>
                </div>
            );
        } else {
            return (<div>
                    <Login/>
                </div>
            );
        }
}
