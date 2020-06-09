const mongoose = require('mongoose');


const MessageModel = new mongoose.Schema({
  userName: {
    type: String,
  },
  messageTime: {
    type: String,
  },
  chatRoomName: {
    type: String,
  },
  message: {
    type: String,
  },
});


module.exports = mongoose.model('messages', MessageModel);
