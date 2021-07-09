const { labsDbInsertion } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const { created, failOnInsertion, missingFields } = require('./dictionary/statusMessages');

const labsInsertion = async (body) => {
  try {
    const requiredFields = ['labName', 'address'];
    if (!validateInputs(requiredFields, body)) return missingFields;
    const insertionRes = await labsDbInsertion(body);
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnInsertion;
    const generatedIds = (insertionRes.map((e) => e.id))
    return { ...created,
      message: created.message.concat(generatedIds)
    };
  } catch (err) {
    console.log(`error at services labsInsertion: ${err}`);
    return err;
  }
};

module.exports = labsInsertion;
