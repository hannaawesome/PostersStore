import React, {Component} from 'react';
import AccountDetails from "../../components/acountDetails";
import OrderList from "../../components/orderList";
import {LoginPage} from "tabler-react";

class Account extends Component {
    state = {
        loggedIn: true
    };
    render() {
        if (this.state.loggedIn) {
            return (<div>
                    <h5>MyAccount</h5>
                    <AccountDetails/>
                    <h5>OrderList</h5>
                    <OrderList/>
                </div>
            );
        } else {
            return (<div>
                    <LoginPage/>
                </div>
            );
        }
    }
}
export default Account;