const getAllActiveTests = require('./getAllActiveTests');
const getTestsByName = require('./getTestsByName');
const testsDbDeletion = require('./testsDbDeletion');
const testsDbInsertion = require('./testsDbInsertion');
const testsLabsDbDeletion = require('./testsLabsDbDeletion');
const updTestsById = require('./updTestsById');

module.exports = {
  getAllActiveTests,
  getTestsByName,
  testsDbDeletion,
  testsDbInsertion,
  testsLabsDbDeletion,
  updTestsById,
 };
