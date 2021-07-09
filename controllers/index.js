const getActiveLabs = require('./getActiveLabs');
const getActiveTests = require('./getActiveTests');
const insertAssociation = require('./insertAssociation');
const insertLabs = require('./insertLabs');
const insertTests = require('./insertTests');
const removeAssociation = require('./removeAssociation');
const removeTests = require('./removeTests')
const updateLabs = require('./updateLabs');
const updateTests = require('./updateTests');

module.exports = {
  getActiveLabs,
  getActiveTests,
  insertAssociation,
  insertLabs,
  insertTests,
  removeAssociation,
  removeTests,
  updateLabs,
  updateTests,
};