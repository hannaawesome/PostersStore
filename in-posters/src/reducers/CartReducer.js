import $ from "jquery";
import makeToast from "../Toaster";

const handleAddItem = (posterId,measurement) => {
    var data = {
        email: sessionStorage.getItem("userEmail"),
        posterId: posterId,
        chosenMeasurement:measurement
    };

    // Submit form via jQuery/AJAX
    $.ajax({
        type: "POST",
        url: "/add_to_cart",
        data: data,
    })
        .done(function(data) {makeToast("success","Added to Cart!")})
        .fail(function(jqXhr) {});
};

const handleRemoveItem = (posterId) => {
    var data = {
        email: sessionStorage.getItem("userEmail"),
        posterId: posterId,
    };

    // Submit form via jQuery/AJAX
    $.ajax({
        type: "POST",
        url: "/delete_from_cart",
        data: data,
    })
        .done(function(data) {})
        .fail(function(jqXhr) {});
};

const handleChangeAmountItem = (posterId, amount) => {
    var data = {
        email: sessionStorage.getItem("userEmail"),
        posterId: posterId,
        amountChosen: amount,
    };

    // Submit form via jQuery/AJAX
    $.ajax({
        type: "POST",
        url: "/update_poster_cart_amount",
        data: data,
    })
        .done(function(data) {})
        .fail(function(jqXhr) {});
};

const handleChangeSizeItem = (posterId,measurement) => {
    var data = {
        email: sessionStorage.getItem("userEmail"),
        posterId: posterId,
        measurement:measurement
    };

    // Submit form via jQuery/AJAX
    $.ajax({
        type: "POST",
        url: "/update_poster_cart_size",
        data: data,
    })
        .done(function(data) {})
        .fail(function(jqXhr) {});
};

const Storage = (cartItems) => {
    localStorage.setItem(
        "cart",
        JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
};

export const sumItems = (cartItems) => {
    Storage(cartItems);
    let itemCount = cartItems.reduce(
        (totalPrice, poster) => totalPrice + poster.amountChosen,
        0
    );
    let totalPrice = cartItems
        .reduce((totalPrice, poster) => totalPrice + poster.poster.price * poster.amountChosen, 0)
        .toFixed(2);
    return { itemCount, totalPrice };
};

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find((item) => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    amountChosen: 1,
                    measurementChosen:action.measurement
                });
                handleAddItem(action.payload.id);
            }

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "REMOVE_ITEM":
            handleRemoveItem(action.payload.id);
            return {
                ...state,
                ...sumItems(
                    state.cartItems.filter((item) => item.id !== action.payload.id)
                ),
                cartItems: [
                    ...state.cartItems.filter((item) => item.id !== action.payload.id),
                ],
            };
        case "INCREASE":
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
                ].amountChosen++;
            handleChangeAmountItem(action.payload.id, action.payload.amountChosen);
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "DECREASE":
           state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
                ].amountChosen--;
            handleChangeAmountItem(action.payload.id,action.payload.amountChosen );
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "CHANGE_SIZE":
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
                ].measurement=action.payload.measurement;
            handleChangeSizeItem(action.payload.id,action.payload.measurement );

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            };
        case "CLEAR":
            return {
                cartItems: [],
                ...sumItems([]),
            };

        default:
            return state;
    }
};
