import React, { createContext, useReducer, use } from "react";
import { CartReducer, sumItems } from "../reducers/CartReducer";

export const CartContext = createContext();

const storage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
const initialState = {
    cartItems: storage,
    ...sumItems(storage),
    checkout: false
};

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const increase = payload => {
        dispatch({ type: "INCREASE", payload });
    };

    const decrease = payload => {
        dispatch({ type: "DECREASE", payload });
    };
    const changeAmount = payload => {
        dispatch({ type: "CHANGE_AMOUNT", payload });
    };const changeSize = payload => {
        dispatch({ type: "CHANGE_SIZE", payload });
    };
    const addingPoster = payload => {
        dispatch({ type: "ADD_ITEM", payload });
    };

    const removePoster = payload => {
        dispatch({ type: "REMOVE_ITEM", payload });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR" });
    };

    const handleCheckout = () => {
        console.log("CHECKOUT", state);
        dispatch({ type: "CHECKOUT" });
    };

    const contextValues = {
        removePoster,
        addingPoster,
        increase,
        decrease,
        changeAmount,
        changeSize,
        clearCart,
        handleCheckout,
        ...state
    };

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
