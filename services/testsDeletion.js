const { testsDbDeletion, testsLabsDbDeletion } = require('../model');
const statusMessages = require('./dictionary/statusMessages');


const testsDeletion = async (testId) => {
  try {
    if (!parseInt(testId)) return statusMessages.missingFields;
    const deletionRes = await testsDbDeletion([testId]);
    if (deletionRes.code) return statusMessages[deletionRes.code];
    if (deletionRes === 0) return statusMessages.zeroAffectedRows;
    const deletionTestsLabsRes = await testsLabsDbDeletion([testId]);
    if (deletionTestsLabsRes.affectedRows === 0) return statusMessages.testDeletedNoAssociationFound;
    return statusMessages.deleted;
  } catch (err) {
    console.log(`error at services testsDeletion: ${err}`);
    return err;
  }
};

module.exports = testsDeletion;
