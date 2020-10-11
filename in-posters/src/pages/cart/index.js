import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import PosterViewInCart from "./posterViewInCart";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import makeToast from "../../Toaster";

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
    const classes = useStyles();
    const {
        totalPrice,
        cartItems,
        itemCount,
        clearCart,
        checkout,
        handleCheckout,
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
        makeToast("info","Checked out succefully!");
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                Cart
            </Typography>

            <div className="row no-gutters justify-content-center">
                <div className="col-sm-9 p-3">
                    {cartItems.length > 0 ? (
                        <div className="card card-body border-0">
                            {cartItems !== undefined &&cartItems.map((poster) => (
                                <PosterViewInCart key={poster._id} poster={poster} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-3 text-center text-muted">Your cart is empty</div>
                    )}

                    {checkout && (
                        <div className="p-3 text-center text-success">
                            <p>Checkout successful</p>
                            <Link to="/shop" className="btn btn-outline-success btn-sm">
                                BUY MORE
                            </Link>
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="col-sm-3 p-3">
                        <div className="card card-body">
                            <p className="mb-1">Total Items</p>
                            <h4 className=" mb-3 txt-right">{itemCount}</h4>
                            <p className="mb-1">Total Payment</p>
                            <h3 className="m-0 txt-right">{totalPrice}</h3>
                            <hr className="my-4" />
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary mb-2"
                                    onClick={onCheckout}
                                >
                                    CHECKOUT
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outlineprimary btn-sm"
                                    onClick={clearCart}
                                >
                                    CLEAR
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
