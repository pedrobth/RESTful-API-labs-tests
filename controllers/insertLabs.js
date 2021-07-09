const { Router } = require('express');
const { labsInsertion } = require('../services');

const insertLabs = Router();

insertLabs.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const insertionResponse = await labsInsertion(body);
    if (insertionResponse.err) return next(insertionResponse);
    const { message, status } = insertionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on insertLabs controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = insertLabs;
