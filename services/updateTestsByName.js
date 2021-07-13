const { updTestsByName } = require('../model');
const { partialRequestSuceeded, validateInputs } = require('./helpers');
const statusMessages = require('./dictionary/statusMessages');

const updateTestsByName = async (body) => {
  try {
    const requiredFields = ['testName', 'testNewName', 'testNewType'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const updateRes = await updTestsByName(body);
    if (updateRes.code || updateRes.errno === 3819) {
      return (statusMessages[`${updateRes.code}`] || statusMessages.ER_BAD_INPUT)
    };
    const allUpdated = updateRes
      .find((insertion) => insertion === 0);
    if (allUpdated === 0) return partialRequestSuceeded(updateRes, body);
    return statusMessages.updated;
  } catch (err) {
    console.log(`error at services updateTestsByName: ${err}`);
    return err;
  }
};

module.exports = updateTestsByName;