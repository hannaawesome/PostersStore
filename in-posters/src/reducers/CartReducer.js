import $ from "jquery";

const handleAddItem = (posterId,amount,width,length) => {
    var data = {
        _id: sessionStorage.getItem("userId"),
        posterId: posterId,
        amount,
        measurement:{
            width:width,
            length:length
        }
    };

    // Submit form via jQuery/AJAX
    $.ajax({
        type: "POST",
        url: "/add_to_cart",
        data: data,
    })
        .done(function(data) {})
        .fail(function(jqXhr) {});
};

const handleRemoveItem = (posterId) => {
    var data = {
        _id: sessionStorage.getItem("userId"),
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
        _id: sessionStorage.getItem("userId"),
        posterId: posterId,
        amount: amount,
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

const handleChangeSizeItem = (posterId, width,length) => {
    var data = {
        _id: sessionStorage.getItem("userId"),
        posterId: posterId,
        measurement:{
            width:width,
            length:length
        }
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
        (totalPrice, poster) => totalPrice + poster.quantity,
        0
    );
    let totalPrice = cartItems
        .reduce((totalPrice, poster) => totalPrice + poster.price * poster.quantity, 0)
        .toFixed(2);
    return { itemCount, totalPrice };
};

export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find((item) => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: action.payload.amount,
                });
                handleAddItem(action.payload.id,action.payload.amount,action.payload.width,action.payload.length);
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
                ].quantity++;
            handleChangeAmountItem(action.payload.id, action.payload.amount);
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "DECREASE":
           state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
                ].quantity--;
            handleChangeAmountItem(action.payload.id,action.payload.amount );
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "CHANGE_AMOUNT":
            state.cartItems[
                state.cartItems.findIndex((item) => item.id === action.payload.id)
                ].quantity=action.payload.amount;
            handleChangeAmountItem(action.payload.id,action.payload.amount );
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };
        case "CHANGE_SIZE":

            handleChangeSizeItem(action.payload.id,action.payload.width,action.payload.length );
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
