const { Router } = require('express');
const { getActiveTests, insertTests, updateTests } = require('../controllers');

const TestsRoutes = Router();

TestsRoutes.get('/', getActiveTests);
TestsRoutes.put('/', updateTests);
TestsRoutes.post('/', insertTests);

module.exports = TestsRoutes;
