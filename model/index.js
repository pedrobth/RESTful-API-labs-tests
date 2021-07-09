const getAllActiveLabs = require('./getAllActiveLabs');
const getAllActiveTests = require('./getAllActiveTests');
const getLabsByName = require('./getLabsByName');
const getTestsByName = require('./getTestsByName');
const labsDbInsertion = require('./labsDbInsertion');
const testsDbDeletion = require('./testsDbDeletion');
const testsDbInsertion = require('./testsDbInsertion');
const testsLabsDbDeletion = require('./testsLabsDbDeletion');
const updLabsById = require('./updLabsById');
const updTestsById = require('./updTestsById');

module.exports = {
  getAllActiveLabs,
  getAllActiveTests,
  getLabsByName,
  getTestsByName,
  labsDbInsertion,
  testsDbDeletion,
  testsDbInsertion,
  testsLabsDbDeletion,
  updLabsById,
  updTestsById,
 };
