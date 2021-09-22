const { Router } = require('express');
const { getActiveTests, insertTests, removeTests, updateTests } = require('../controllers');

const TestsRoutes = Router();

TestsRoutes.get('/', getActiveTests);
TestsRoutes.put('/', updateTests);
TestsRoutes.post('/', insertTests);
TestsRoutes.delete('/:testId', removeTests);

module.exports = TestsRoutes;
