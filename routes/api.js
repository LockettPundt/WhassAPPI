const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment');

const router = express.Router();

const MessageModel = require('../models/MessageModel');
const ChatRoomModel = require('../models/ChatRoomModel');

// create chat room.

router.post('/create', async (req, res) => {
  const {
    chatRoomName,
    dateCreated,
    lastAccess,
    password,
  } = req.body.chatRoomInfo;

  try {
    const roomNameCheck = await ChatRoomModel.findOne({ chatRoomName });
    // console.log(roomNameCheck);
    if (!roomNameCheck) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newChatRoom = new ChatRoomModel({
        chatRoomName,
        dateCreated,
        lastAccess,
        password: hash,
      });

      const roomToPost = await newChatRoom.save();
      res.json(roomToPost);
    }
    if (roomNameCheck) {
      res.json({ error: 'Room name is already in use.' });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// join chat room.

router.post('/join', async (req, res) => {
  const { chatRoomName, password } = req.body.userInfo;
  console.log(chatRoomName, password);
  try {
    const getChatRoom = await ChatRoomModel.findOne({ chatRoomName });
    console.log('here is the room: ', getChatRoom);
    if (getChatRoom) {
      const match = bcrypt.compareSync(password, getChatRoom.password);
      console.log(match);
      if (match) res.json({ success: 'Correct name and password.' });
      else res.json({ error: 'Incorrect password.' });
    }
    if (!getChatRoom) {
      res.json({ error: 'No room by that name.' });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post('/messages', async (req, res) => {
  const {
    userName, chatRoomName, message, messageTime,
  } = req.body;
  // console.log(req.body);

  const newMessage = new MessageModel({
    userName,
    chatRoomName,
    message,
    messageTime,
  });
  try {
    // console.log('posting: ', newMessage);
    const postMessage = await newMessage.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get message history.

router.get('/chathistory/:room?', async (req, res) => {
  const { room } = req.params;
  // console.log(room);
  const chatHistory = await MessageModel.find({ chatRoomName: room });
  // console.log('chat history is: ', chatHistory);
  res.json(chatHistory);
});


module.exports = router;
