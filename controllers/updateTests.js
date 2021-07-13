const { Router } = require('express');
const { updateTestsByName } = require('../services');

const updateTests = Router();

updateTests.put('/', async (req, res, next) => {
  try {
    const { body } = req;
    const updateResponse = await updateTestsByName(body);
    if (updateResponse.err) return next(updateResponse);
    const { message, status } = updateResponse;
    return res.status(status)
      .json(updateResponse.failRequests
        ? { message, failRequests: updateResponse.failRequests }
        : { message });
  } catch (error) {
    console.log('error on updateTests controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = updateTests;