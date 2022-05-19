// Use the MariaDB Node.js Connector
const mariadb = require('mariadb');
const dbConfig = require('./db.config');
// Create a connection pool
const pool = mariadb.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.port,
});

const sendQueryAndReturnResponse = async (query, inputs) => {
  try {
    let inputsClean;
    if (inputs !== undefined) inputsClean = inputs;
    let data = await pool.query(query, inputsClean);
    // if (shouldReturnSingleValue && response.length > 0) response = response[0];
    return { error: false, data, status: 200 };
  } catch (error) {
    throw error;
  }
};

// Expose a method to establish connection with MariaDB SkySQL
// module.exports = Object.freeze({
//   pool: pool
// });
module.exports = {
  sendQueryAndReturnResponse,
};
