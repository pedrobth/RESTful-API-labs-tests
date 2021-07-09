const getAllActiveLabs = require('./getAllActiveLabs');
const getAllActiveTests = require('./getAllActiveTests');
const getTestsByName = require('./getTestsByName');
const labsDbInsertion = require('./labsDbInsertion');
const testsDbDeletion = require('./testsDbDeletion');
const testsDbInsertion = require('./testsDbInsertion');
const testsLabsDbDeletion = require('./testsLabsDbDeletion');
const updTestsById = require('./updTestsById');

module.exports = {
  getAllActiveLabs,
  getAllActiveTests,
  getTestsByName,
  labsDbInsertion,
  testsDbDeletion,
  testsDbInsertion,
  testsLabsDbDeletion,
  updTestsById,
 };
