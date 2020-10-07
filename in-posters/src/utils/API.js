import axios from 'axios';

export default {
    addToCart: function(posterData) {
        return axios.post('/add_to_cart',posterData);
    },
    addOrder: function(orderData) {
        return axios.post('/add_order', orderData);
    },
    addToLiked: function(posterData) {
        return axios.post('/add_to_liked', posterData);
    },
    registerUser: function(userData) {
        return axios.post('/register', userData);
    },
    loginUser: function(userData) {
        return axios.post('/login', userData);
    },
    cancelOrder: function(orderData) {
        return axios.post('/cancel_order', orderData);
    },
    logoutUser: function() {
        return axios.get('/logout');
    },
    getUserOrders: function(id) {
        return axios.get('/get_user_orders?id='+id);
    },
    getLikedItems: function() {
        return axios.get('/get_liked_items');
    },
    deleteFromCart: function(posterData) {
        return axios.delete('/delete_from_cart', posterData);
    },
    updateUserDetail: function(userData) {
        return axios.post('/update_user_detail', userData);
    },
    UpdatePosterCartAmount: function(posterData) {
        return axios.post('/update_poster_cart_amount', posterData);
    },
    updatePosterCartSize: function(posterData) {
        return axios.post('/update_poster_cart_size', posterData);
    },
    getUser: function(id) {
        return axios.get('/get_user?id='+id);
    },
    getPoster: function(id) {
        return axios.get('/get_poster?id='+id);
    },
    addUser: function(userData) {
        return axios.post('/add_user', userData);
    },
    addPoster: function(posterData) {
        return axios.post('/add_poster', posterData);
    },
    getUserByEmail: function(id) {
        return axios.get('/get_user_id_by_email?id='+id);
    },
    getUsers: function() {
        return axios.get('/get_users');
    },
    getOrders: function() {
        return axios.get('/get_orders');
    },
    updateUser: function(userData) {
        return axios.post('/update_user', userData);
    },
    updatePoster: function(posterData) {
        return axios.post('/update_poster', posterData);
    },
};