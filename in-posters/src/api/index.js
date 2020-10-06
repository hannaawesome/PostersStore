import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});
// app.use('/', indexRoute);
// app.use('/add_order', addOrderRoute);
// app.use('/add_to_cart', addToCartRoute);
// app.use('/add_to_liked', addToLikedRoute);
// app.use('/delete_from_cart', deleteFromCartRoute);
// app.use('/get_liked_items', getLikedItemsRoute);
// app.use('/get_user_orders', getUserOrdersRoute);
// app.use('/logout', logoutRoute);
// app.use('/cancel_order', cancelOrderRoute);
// app.use('/login', loginRoute);
// app.use('/register', registerRoute);
// app.use('/update_user_detail', updateUserDetailRoute);
// app.use('/update_product_cart_amount', updatePosterCartAmountRoute);
// app.use('/update_product_cart_size', updatePosterCartSizeRoute);
// app.use('/update_user', updateUserRoute);
// app.use('/update_poster', updatePosterRoute);
// app.use('/get_user', getUserRoute);
// app.use('/get_poster', getPosterRoute);
// app.use('/add_poster', addPosterRoute);
// app.use('/get_user_id_by_email', getUserIdByEmailRoute);
// app.use('/get_users', getUsersRoute);
// app.use('/get_orders', getOrdersRoute);
export const addUser = payload => api.post(`/add_user`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = id => api.delete(`/movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);

const apis = {
    addUser,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
};

export default apis