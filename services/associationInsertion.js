const { associateTestsToLab } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const associationInsertion = async (body, labName) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const associationRes = await associateTestsToLab(body, labName);
    if (associationRes.code) return statusMessages[`${associationRes.code}`];
    return statusMessages.associationCreated;
  } catch (err) {
    console.log(`error at services associationInsertion: ${err}`);
    return err;
  }
};

module.exports = associationInsertion;
