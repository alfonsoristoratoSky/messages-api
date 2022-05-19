const { sendQueryAndReturnResponse, encryptData } = require('./common');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  all: async () => {
    const query = 'SELECT * FROM users';
    return await sendQueryAndReturnResponse(query);
  },

  findOne: async (userId) => {
    let query = 'SELECT * FROM users WHERE id = ?';
    return await sendQueryAndReturnResponse(query, userId);
  },

  findByUsername: async (username) => {
    let query = 'SELECT * FROM users WHERE username = ?';
    return await sendQueryAndReturnResponse(query, username);
  },

  addUser: async (user) => {
    let query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    let inputs = [];
    Object.entries(user).forEach(([columnName, value]) => {
      inputs.push(value);
    });

    const hash = bcrypt.hashSync(inputs[1], saltRounds);
    inputs[1] = hash;

    return await sendQueryAndReturnResponse(query, inputs);
  },

  //   editMessage: async (newMessage, messageId) => {
  //     let query = 'UPDATE messages SET `message` = ? WHERE `id` = ?';
  //     let inputs = [];

  //     Object.entries(newMessage).forEach(async ([columnName, value]) => {
  //       inputs.push(value);
  //     });
  //     inputs.push(messageId);
  //     return await sendQueryAndReturnResponse(query, inputs);
  //   },

  deleteUser: async (userId) => {
    let query = 'DELETE FROM users WHERE `id` = ?';

    return await sendQueryAndReturnResponse(query, userId);
  },
};
