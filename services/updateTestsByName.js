const { getTestsByName, updTestsById } = require('../model');
const { atLeastOneTestMissing, failOnUpdate, updated } = require('./dictionary/statusMessages');

const validateTestNames = (testsIds, body) => {
  const emptyItemPosition = testsIds.findIndex((item) => !item);
  if (emptyItemPosition !== -1) {
    return { ...atLeastOneTestMissing, message:
      atLeastOneTestMissing.message.concat(body[emptyItemPosition].oldName) };
  }
  return false;
};

const updateTestsByName = async (body) => {
  try {
    const testsList = await getTestsByName(body);
    const missingTestInDb = validateTestNames(testsList, body);
    if (missingTestInDb) return missingTestInDb;
    const updateRes = await updTestsById(testsList, body);
    const allUpdated = updateRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnUpdate;
    return updated;
  } catch (err) {
    console.log(`error at services updateTestsByName: ${err}`);
    return err;
  }
};

module.exports = updateTestsByName;