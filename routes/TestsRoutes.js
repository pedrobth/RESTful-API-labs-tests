const { Router } = require('express');
const { getActiveTests } = require('../controllers');

const TestsRoutes = Router();

TestsRoutes.get('/', getActiveTests);

module.exports = TestsRoutes;
