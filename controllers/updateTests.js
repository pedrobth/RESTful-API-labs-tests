const { Router } = require('express');
const { updateTestsById } = require('../services');

const updateTests = Router();

// I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain.
updateTests.put('/', async (req, res, next) => {
  try {
    const { body } = req;
    const updateResponse = await updateTestsById(body);
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