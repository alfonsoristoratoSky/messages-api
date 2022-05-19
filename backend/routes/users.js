const express = require('express');
const dataAccessor = require('../data/dataAccessor');
const router = express.Router();

const {
  returnResponseOfDataAccessorResponse,
} = require('../utils/serverFunctions');

router.get('/', async (req, res) => {
  try {
    await returnResponseOfDataAccessorResponse(dataAccessor.users.all(), res);
  } catch (err) {
    throw err;
  }
});

router.get('/:userId', async (req, res) => {
  let userId = req.params.userId;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.users.findOne(userId),
      res
    );
  } catch (err) {
    throw err;
  }
});

router.post('/', async (req, res) => {
  let data = req.body;

  try {
    await returnResponseOfDataAccessorResponse(
      await dataAccessor.users.addUser(data),
      res
    );
  } catch (err) {
    throw err;
  }
});

// router.put('/:userId', async (req, res) => {
//   let userId = req.params.userId;
//   let data = req.body;
//   try {
//     await returnResponseOfDataAccessorResponse(
//       dataAccessor.users.editUser(data, userId),
//       res
//     );
//   } catch (err) {
//     throw err;
//   }
// });

router.delete('/:userId', async (req, res) => {
  let userId = req.params.userId;
  try {
    await returnResponseOfDataAccessorResponse(
      dataAccessor.users.deleteUser(userId),
      res
    );
  } catch (err) {
    throw err;
  }
});
module.exports = router;
