const { sendQueryAndReturnResponse, encryptData } = require('./common');

module.exports = {
  all: async () => {
    const query = 'SELECT * FROM messages';
    return await sendQueryAndReturnResponse(query);
  },

  findOne: async (messageId) => {
    let query = 'SELECT * FROM messages WHERE id = ?';
    return await sendQueryAndReturnResponse(query, messageId);
  },

  addMessage: async (message) => {
    let query = 'INSERT INTO messages (message) VALUES (?)';
    let inputs = [];
    Object.entries(message).forEach(([columnName, value]) => {
      inputs.push(value);
    });

    return await sendQueryAndReturnResponse(query, inputs);
  },

  editMessage: async (newMessage, messageId) => {
    let query = 'UPDATE messages SET `message` = ? WHERE `id` = ?';
    let inputs = [];

    Object.entries(newMessage).forEach(async ([columnName, value]) => {
      inputs.push(value);
    });
    inputs.push(messageId);
    return await sendQueryAndReturnResponse(query, inputs);
  },

  deleteMessage: async (messageId) => {
    let query = 'DELETE FROM `messages` WHERE `id` = ?';

    return await sendQueryAndReturnResponse(query, messageId);
  },
};
