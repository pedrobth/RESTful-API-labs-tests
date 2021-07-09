const { removeAssociation, getLabsByName, getTestsByName, } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const { alreadyAssociated,
  atLeastOneTestActive,
  atLeastOneTestMissing,
  failOnUpdate,
  missingFields,
  updated,
  labNotInDbOrInactive } = require('./dictionary/statusMessages');

const validateTestNames = (testsIds, body) => {
  const emptyItemPosition = testsIds.findIndex((item) => !item);
  if (emptyItemPosition !== -1) {
    return { ...atLeastOneTestMissing, message:
      atLeastOneTestMissing.message.concat(body[emptyItemPosition].testName) };
  }
  return false;
};

const associationDeletion = async (body, labName) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return missingFields;
    const testsList = await getTestsByName(body);
    const missingTestInDb = validateTestNames(testsList, body);
    if (missingTestInDb) return missingTestInDb;
    const activeTestIndex = testsList.findIndex((test) => test.active === 0)
    if (activeTestIndex !== -1) return { ...atLeastOneTestActive, message:
      atLeastOneTestActive.message.concat(body[activeTestIndex].testName) }
    
    const labData = await getLabsByName([{ labName }]);
    if (!labData) return labNotInDbOrInactive;
    if (labData.active === 0) return labNotInDbOrInactive;

    const associationRes = await removeAssociation(testsList, labData[0].id);
    if (associationRes == 'alreadyAssociated') return alreadyAssociated;
    const allUpdated = associationRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnUpdate;
    return updated;
  } catch (err) {
    console.log(`error at services associationDeletion: ${err}`);
    return err;
  }
};

module.exports = associationDeletion;