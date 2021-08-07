const { Router } = require('express');
const { testsDeletion } = require('../services');

const removeTests = Router();

removeTests.delete('/', async (req, res, next) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain..
    const { body } = req;
    const deletionResponse = await testsDeletion(body);
    if (deletionResponse.err) return next(deletionResponse);
    const { message, status } = deletionResponse;
    return res.status(status)
      .json(deletionResponse.failRequests
        ? { message, failRequests: deletionResponse.failRequests }
        : { message });
  } catch (error) {
    console.log('error on removeTests controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = removeTests;