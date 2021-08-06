const allActiveLabs = require('./allActiveLabs');
const allActiveTests = require('./allActiveTests');
const associationDeletion = require('./associationDeletion');
const associationInsertion = require('./associationInsertion');
const labsDeletion = require('./labsDeletion');
const labsInsertion = require('./labsInsertion');
const testsDeletion = require('./testsDeletion');
const testsInsertion = require('./testsInsertion');
const updateLabsById = require('./updateLabsById');
const updateTestsById = require('./updateTestsById');

module.exports = {
  allActiveLabs,
  associationDeletion,
  associationInsertion,
  allActiveTests,
  labsDeletion,
  labsInsertion,
  testsDeletion,
  testsInsertion,
  updateLabsById,
  updateTestsById,
};