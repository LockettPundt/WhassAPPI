const mongoose = require('mongoose');


const ChatRoomModel = new mongoose.Schema({
  chatRoomName: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  lastAccess: {
    type: String,
  },
  password: {
    type: String,
  },
});


module.exports = mongoose.model('chat_rooms', ChatRoomModel);
