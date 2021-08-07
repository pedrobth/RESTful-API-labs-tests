const { testsDbDeletion, testsLabsDbDeletion } = require('../model');
const statusMessages = require('./dictionary/statusMessages');
const { partialRequestSuceeded, validateInputs } = require('./helpers');


const testsDeletion = async (body) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain..
    const requiredFields = ['testId'];
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
