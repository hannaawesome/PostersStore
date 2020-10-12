const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
});
chatroomSchema.statics.FIND_ONE_CHATROOM = async function (name) {
  return this.findOne({name:name}).exec();
};

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = { Chatroom };
