const { getTestsById, updTestsById } = require('../model');
const { handleIdNotInDb, partialRequestSuceeded, validateInputs } = require('./helpers');
const statusMessages = require('./dictionary/statusMessages');

const updateTestsById = async (body) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain.
    const requiredFields = ['testId', 'testName', 'testType'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const testsExists = await getTestsById(body);
    if (testsExists.some((id) => id === undefined)) return handleIdNotInDb(testsExists, body);
    const updateRes = await updTestsById(body);
    if (updateRes.errno === 3819) return statusMessages.ER_BAD_INPUT;
    if (updateRes.some(update => update === 0)) return partialRequestSuceeded(updateRes, body);
    return statusMessages.updated;
  } catch (err) {
    console.log(`error at services updateTestsById: ${err}`);
    return err;
  }
};

module.exports = updateTestsById;