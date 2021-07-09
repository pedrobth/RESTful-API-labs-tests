const allActiveLabs = require('./allActiveLabs');
const allActiveTests = require('./allActiveTests');
const associationDeletion = require('./associationDeletion');
const associationInsertion = require('./associationInsertion');
const labsInsertion = require('./labsInsertion');
const testsDeletion = require('./testsDeletion');
const testsInsertion = require('./testsInsertion');
const updateLabsByName = require('./updateLabsByName');
const updateTestsByName = require('./updateTestsByName');

module.exports = {
  allActiveLabs,
  associationDeletion,
  associationInsertion,
  allActiveTests,
  labsInsertion,
  testsDeletion,
  testsInsertion,
  updateLabsByName,
  updateTestsByName,
};