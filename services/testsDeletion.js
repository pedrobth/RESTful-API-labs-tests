const { testsDbDeletion, testsLabsDbDeletion } = require('../model');
const statusMessages = require('./dictionary/statusMessages');
const { partialRequestSuceeded, validateInputs } = require('./helpers');

const validateTestNames = (testsIds, body) => {
  const emptyItemPosition = testsIds.findIndex((item) => !item);
  if (emptyItemPosition !== -1) {
    return { ...atLeastOneTestMissing, message:
      atLeastOneTestMissing.message.concat(body[emptyItemPosition].oldName) };
  }
  return false;
};

const testsDeletion = async (body) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const deletionRes = await testsDbDeletion(body);
    if (deletionRes.code) return statusMessages[deletionRes.code];
    const allTestsDeleted = deletionRes
      .find((deletion) => deletion === 0);
    const deletionTestsLabsRes = await testsLabsDbDeletion(body);
    const allTestsRelationsDeleted = deletionTestsLabsRes
      .find((relation) => relation === 0);
    if (allTestsDeleted === 0
      || allTestsRelationsDeleted === 0) return partialRequestSuceeded(deletionRes, deletionTestsLabsRes, body);
    return statusMessages.deleted;
  } catch (err) {
    console.log(`error at services updateTestsByName: ${err}`);
    return err;
  }
};

module.exports = testsDeletion;
