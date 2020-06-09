const express = require('express');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const moment = require('moment');

const router = express.Router();

const MessageModel = require('../models/MessageModel');

// create chat room.

router.post('/create', (req, res) => {
  res.sendStatus(200);
});

// join chat room

router.post('/join', (req, res) => {
  res.send(200);
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

// get message history

router.get('/chathistory/:room?', async (req, res) => {
  const { room } = req.params;
  // console.log(room);
  const chatHistory = await MessageModel.find({ chatRoomName: room });
  // console.log('chat history is: ', chatHistory);
  res.json(chatHistory);
});


module.exports = router;
