const { Router } = require('express');
const { allActiveTests } = require('../services');

const TestsRoutes = Router();

TestsRoutes.get('/', async (_req, res, next) => {
  try {
    const allTests = await allActiveTests();
    if (allTests.err) return next(allTests)
    const { message, status } = allTests;
    return res.status(status).json({ message });

  } catch (error) {
    console.log(`error on getting active tests ${error}`);
    return next({ error, status: 'internal server error' })
  }
})

module.exports = TestsRoutes;