const { Router } = require('express');
const { testsDeletion } = require('../services');

const removeTests = Router();

removeTests.delete('/', async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body)
    const deletionResponse = await testsDeletion(body);
    if (deletionResponse.err) return next(deletionResponse);
    const { message, status } = deletionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on removeTests controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = removeTests;