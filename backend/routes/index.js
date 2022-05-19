const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send();
});

const messagesRouter = require('./messages');
const usersRouter = require('./users');

router.use('/messages', messagesRouter);
router.use('/users', usersRouter);

module.exports = router;
