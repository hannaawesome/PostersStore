const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
        ref: "Chatroom",
    },
    user: {
        type: String,
        required: "Chatroom is required!",
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required!",
    },
     createdAt:{ type: Date, default: Date.now() },
    likes:Array,//array of (userEmail)
    unlikes:Array,//array of (userEmail)
});

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message };