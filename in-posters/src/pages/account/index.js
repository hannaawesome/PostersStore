import React, {Component} from 'react';
import AccountDetails from "../../components/accountDetails";
import OrderListUser from "../../components/orderListUser";
import {Error404Page} from "tabler-react";
import {withStyles} from "@material-ui/core/styles";

export default function Account(){
    const [userD, userDSet] = React.useState({});

    React.useEffect(() => {  async function fetchUser() {const fullResponse = await fetch(
            "/get_user?email="+sessionStorage.getItem("userEmail")
        );
        const responseJson = await fullResponse.json();
        userDSet(responseJson);}
        fetchUser().then(r => {
            console.log("got user");
    })}, []);

    // constructor() {
    //     super();
    //     this.state = {
    //         user: {}
    //     };
    // }
    // async componentDidMount() {
    //     try {
    //         const resp = await fetch("/get_user?email=" + sessionStorage.getItem("userEmail"));
    //         if (!resp.ok) {
    //             throw Error(resp.statusText);
    //         }
    //         const user = await resp.json();
    //         console.log(user);
    //
    //         this.setState({user: user});
    //
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // render() {
        return (<div>
                <h5>MyAccount</h5>
                {<AccountDetails user={userD}/>}
                <h5>OrderList</h5>
                <OrderListUser/>
            </div>
        );};
    //}

        //     }{/*user={userD}*/}
        // ).catch(r => {console.log("failed to get user");
        // return (<div>
        //        <Error404Page/>
        //     </div>
        // );});


