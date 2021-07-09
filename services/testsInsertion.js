const { testsDbInsertion } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const { created, failOnInsertion, missingFields } = require('./dictionary/statusMessages');

const testsInsertion = async (body) => {
  try {
    const requiredFields = ['testName', 'testType'];
    if (!validateInputs(requiredFields, body)) return missingFields;
    const insertionRes = await testsDbInsertion(body);
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnInsertion;

    const generatedIds = (insertionRes.map((e) => e.id))
    return { ...created,
      message: created.message.concat(generatedIds)
    };
  } catch (err) {
    console.log(`error at services testsInsertion: ${err}`);
    return err;
  }
};

module.exports = testsInsertion;
