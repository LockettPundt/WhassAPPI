const mongoose = require('mongoose');


const MessageModel = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  messageTime: {
    type: String,
  },
  chatRoom: {
    type: String,
  },
  message: {
    type: String,
  },
});


module.exports = mongoose.model('message', MessageModel);
