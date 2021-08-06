const assocDelByLabName = require('./assocDelByLabName');
const associateTestsToLab = require('./associateTestsToLab');
const labsDbDeletion = require('./labsDbDeletion');
const getAllActiveLabs = require('./getAllActiveLabs');
const getAllActiveTests = require('./getAllActiveTests');
const getLabsById = require('./getLabsById');
const getLabsByName = require('./getLabsByName');
const getTestsById = require('./getTestsById');
const getTestsByName = require('./getTestsByName');
const labsDbInsertion = require('./labsDbInsertion');
const removeAssociation = require('./removeAssociation');
const testsDbDeletion = require('./testsDbDeletion');
const testsDbInsertion = require('./testsDbInsertion');
const testsLabsDbDeletion = require('./testsLabsDbDeletion');
const updLabsById = require('./updLabsById');
const updTestsById = require('./updTestsById');

module.exports = {
  assocDelByLabName,
  associateTestsToLab,
  labsDbDeletion,
  getAllActiveLabs,
  getAllActiveTests,
  getLabsById,
  getLabsByName,
  getTestsById,
  getTestsByName,
  labsDbInsertion,
  removeAssociation,
  testsDbDeletion,
  testsDbInsertion,
  testsLabsDbDeletion,
  updLabsById,
  updTestsById,
 };
