import React, {Component} from 'react';
import AccountDetails from "../../components/acountDetails";
import OrderListUser from "../../components/orderListUser";
import Login from "../login";

export default function Account(){
    const [uId] = React.useState(
        localStorage.getItem("userId")
    );
    if (uId!==""&&uId!==null) {
        sessionStorage.setItem("userId",uId);
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
