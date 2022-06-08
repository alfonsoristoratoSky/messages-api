const express = require('express');
const dataAccessor = require('../data/dataAccessor');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const router = express.Router();

const {
  returnResponseOfDataAccessorResponse,
} = require('../utils/serverFunctions');

// scopes

const readMessagesScope = requiredScopes('read:messages');
const allMessagesScope = requiredScopes('all:messages');

router.get('/', readMessagesScope, async (req, res) => {
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.messages.all(),
      res
    );
  } catch (err) {
    throw err;
  }
});

router.get('/:messageId', readMessagesScope, async (req, res) => {
  let messageId = req.params.messageId;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.messages.findOne(messageId),
      res
    );
  } catch (err) {
    throw err;
  }
});

router.post('/', allMessagesScope, async (req, res) => {
  let data = req.body;

  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.messages.addMessage(data),
      res
    );
  } catch (err) {
    throw err;
  }
});

// POST
// router.post("/", async (req, res) => {
//   let data = req.body;
//   try {
//     const result = await db.pool.query(
//       "insert into maincards (content) values (?)",
//       [data.content]
//     );
//     res.send(result);
//   } catch (err) {
//     throw err;
//   }
// });

router.put('/:messageId', allMessagesScope, async (req, res) => {
  let messageId = req.params.messageId;
  let data = req.body;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.messages.editMessage(data, messageId),
      res
    );
  } catch (err) {
    throw err;
  }
});

router.delete('/:messageId', allMessagesScope, async (req, res) => {
  let messageId = req.params.messageId;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.messages.deleteMessage(messageId),
      res
    );
  } catch (err) {
    throw err;
  }
});
module.exports = router;
