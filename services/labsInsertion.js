const { labsDbInsertion } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const labsInsertion = async (body) => {
  try {
    const requiredFields = ['labName', 'address'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const insertionRes = await labsDbInsertion(body);
    if (insertionRes.code) return statusMessages[insertionRes.code];
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return statusMessages.failOnInsertion;
    const generatedIds = (insertionRes.map((e) => e.id))
    return { ...statusMessages.created, ids: generatedIds };
  } catch (err) {
    console.log(`error at services labsInsertion: ${err}`);
    return err;
  }
};

module.exports = labsInsertion;
