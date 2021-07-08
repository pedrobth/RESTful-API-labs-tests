const { Router } = require('express');
const { testsInsertion } = require('../services');

const insertTests = Router();

insertTests.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const insertionResponse = await testsInsertion(body);
    if (insertionResponse.err) return next(insertionResponse);
    const { message, status } = insertionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on insertTests controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = insertTests;