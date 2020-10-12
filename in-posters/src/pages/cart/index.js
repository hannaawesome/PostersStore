import React, { useContext } from "react";
 import Paypal from '../../helpers/Paypal';
import PosterViewInCart from "./posterViewInCart";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import makeToast from "../../Toaster";
import Empty from "antd/es/empty";
import Result from "antd/es/result";
import Button from "antd/es/button";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    fullScreen: {
        width: "100vw",
        height: "100vh",
    },
}));

const Cart = () => {
    //const classes = useStyles();
    const {
        cartItems,
        itemCount,
        clearCart,
        checkout,
        handleCheckout,
        totalPrice,
    } = useContext(CartContext);
    const [email] = React.useState(
        sessionStorage.getItem("userEmail")
    );
    function onCheckout(){
        var data={
            email:email,
            totalPrice:totalPrice
        };
        $.ajax({
            type: "POST",
            url: "/add_order",
            data: data,
        })
            .done(function(data) {})
            .fail(function(jqXhr) {});
        handleCheckout();
    }

    const [showSuccess, setShowSuccess] = React.useState(false);
   // const [showTotal, setShowTotal] = React.useState(false)

    const transactionSuccess = (data) => {
                    onCheckout();
                    setShowSuccess(true);
                    //setShowTotal(false);
                    clearCart();

    };

    const transactionError = () => {
        console.log('Paypal error')
    };

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    };

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>Cart</h1>
            <div>

                <PosterViewInCart
                    products={cartItems}
                />
                {totalPrice?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total price: ${totalPrice} </h2>
                        <h2>Total posters: {itemCount} </h2>
                    </div>
                    :
                    showSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }
            </div>


{totalPrice>0&&<Grid xs={2}>
            <Paypal
                toPay={totalPrice}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCanceled={transactionCanceled}
            />
            <Button
                type="button"
                className="btn btn-outlineprimary btn-sm"
                onClick={onCheckout}
            >
                Development pay instead of paypal
            </Button> </Grid>}
            <Button
                type="button"
                className="btn btn-outlineprimary btn-sm"
                onClick={clearCart}
            >
                Clear Cart
            </Button>


        </div>)

};

export default Cart;
