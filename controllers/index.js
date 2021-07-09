const getActiveLabs = require('./getActiveLabs');
const getActiveTests = require('./getActiveTests');
const insertLabs = require('./insertLabs');
const insertTests = require('./insertTests');
const removeTests = require('./removeTests')
const updateLabs = require('./updateLabs');
const updateTests = require('./updateTests');

module.exports = {
  getActiveLabs,
  getActiveTests,
  insertLabs,
  insertTests,
  removeTests,
  updateLabs,
  updateTests,
};