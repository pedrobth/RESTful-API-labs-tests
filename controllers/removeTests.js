const { Router } = require('express');
const { testsDeletion } = require('../services');

const removeTests = Router();

removeTests.delete('/:testId', async (req, res, next) => {
  try {
    const { params } = req;
    const { testId } = params;
    const deletionResponse = await testsDeletion(testId);
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