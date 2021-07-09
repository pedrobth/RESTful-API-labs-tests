const { getTestsByName, testsDbDeletion, testsLabsDbDeletion } = require('../model');
const { deleted, failOnDeletion } = require('./dictionary/statusMessages');

const validateTestNames = (testsIds, body) => {
  const emptyItemPosition = testsIds.findIndex((item) => !item);
  if (emptyItemPosition !== -1) {
    return { ...atLeastOneTestMissing, message:
      atLeastOneTestMissing.message.concat(body[emptyItemPosition].oldName) };
  }
  return false;
};

const testsInsertion = async (body) => {
  try {
    const testsList = await getTestsByName(body);
    console.log(testsList)
    const missingTestInDb = validateTestNames(testsList, body);
    if (missingTestInDb) return missingTestInDb;

    const deletionRes = await testsDbDeletion(testsList);
    const allTestsDeleted = deletionRes
    .find((deletion) => deletion === 0);
    const deletionTestsLabsRes = await testsLabsDbDeletion(testsList);
    console.log(deletionTestsLabsRes)
    const allTestsRelationsDeleted = deletionTestsLabsRes
      .find((relation) => relation === 0);
    if (allTestsDeleted || allTestsRelationsDeleted) return failOnDeletion;
    return deleted;
  } catch (err) {
    console.log(`error at services updateTestsByName: ${err}`);
    return err;
  }
};

module.exports = testsInsertion;
