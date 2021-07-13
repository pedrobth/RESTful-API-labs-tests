const { Router } = require('express');
const { updateLabsByName } = require('../services');

const updateLabs = Router();

updateLabs.put('/', async (req, res, next) => {
  try {
    const { body } = req;
    const updateResponse = await updateLabsByName(body);
    if (updateResponse.err) return next(updateResponse);
    const { message, status } = updateResponse;
    return res.status(status)
      .json(updateResponse.failRequests
        ? { message, failRequests: updateResponse.failRequests }
        : { message });
  } catch (error) {
    console.log('error on updateLabs controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = updateLabs;