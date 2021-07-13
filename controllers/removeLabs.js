const { Router } = require('express');
const { labsDeletion } = require('../services');

const removeLabs = Router();

removeLabs.delete('/', async (req, res, next) => {
  try {
    const { body } = req;
    const deletionResponse = await labsDeletion(body);
    if (deletionResponse.err) return next(deletionResponse);
    const { message, status } = deletionResponse;
    return res.status(status)
      .json(deletionResponse.failRequests
        ? { message, failRequests: deletionResponse.failRequests }
        : { message });
  } catch (error) {
    console.log('error on removeLabs controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = removeLabs;