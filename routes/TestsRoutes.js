const { Router } = require('express');
const { getActiveTests, updateTests } = require('../controllers');

const TestsRoutes = Router();

TestsRoutes.get('/', getActiveTests);
TestsRoutes.put('/', updateTests)

module.exports = TestsRoutes;
