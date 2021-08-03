const assocDelByLabName = require('./assocDelByLabName');
const associateTestsToLab = require('./associateTestsToLab');
const labsDbDeletion = require('./labsDbDeletion');
const getAllActiveLabs = require('./getAllActiveLabs');
const getAllActiveTests = require('./getAllActiveTests');
const getLabsByName = require('./getLabsByName');
const getTestsByName = require('./getTestsByName');
const labsDbInsertion = require('./labsDbInsertion');
const removeAssociation = require('./removeAssociation');
const testsDbDeletion = require('./testsDbDeletion');
const testsDbInsertion = require('./testsDbInsertion');
const testsLabsDbDeletion = require('./testsLabsDbDeletion');
const updLabsById = require('./updLabsById');
const updTestsByName = require('./updTestsByName');

module.exports = {
  assocDelByLabName,
  associateTestsToLab,
  labsDbDeletion,
  getAllActiveLabs,
  getAllActiveTests,
  getLabsByName,
  getTestsByName,
  labsDbInsertion,
  removeAssociation,
  testsDbDeletion,
  testsDbInsertion,
  testsLabsDbDeletion,
  updLabsById,
  updTestsByName,
 };
