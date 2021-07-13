const { testsDbDeletion, testsLabsDbDeletion } = require('../model');
const statusMessages = require('./dictionary/statusMessages');
const { partialRequestSuceeded, validateInputs } = require('./helpers');


const testsDeletion = async (body) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const deletionRes = await testsDbDeletion(body);
    if (deletionRes.code) return statusMessages[deletionRes.code];
    const allTestsDeleted = deletionRes
      .find((deletion) => deletion === 0);
    const deletionTestsLabsRes = await testsLabsDbDeletion(body);
    if (allTestsDeleted === 0) return partialRequestSuceeded(deletionRes, body, deletionTestsLabsRes);
    return statusMessages.deleted;
  } catch (err) {
    console.log(`error at services testsDeletion: ${err}`);
    return err;
  }
};

module.exports = testsDeletion;
