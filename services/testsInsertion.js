const { testsDbInsertion } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const testsInsertion = async (body) => {
  try {
    const requiredFields = ['testName', 'testType'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const insertionRes = await testsDbInsertion(body);
    if (insertionRes.code) return statusMessages[insertionRes.code];
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return statusMessages.failOnInsertion;
    const generatedIds = (insertionRes.map((e) => e.id))
    return { ...statusMessages.created, ids: generatedIds };
  } catch (err) {
    console.log(`error at services testsInsertion: ${err}`);
    return err;
  }
};

module.exports = testsInsertion;
