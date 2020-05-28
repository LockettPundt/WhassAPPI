const express = require('express');
const socketAPI = require('../utils/socketAPI');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  socketAPI.io.emit('greet', 'hey you');
  res.sendStatus(200);
});

module.exports = router;
