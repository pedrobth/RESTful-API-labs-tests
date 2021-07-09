const { getLabsByName, updLabsById } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const { atLeastOneLabMissing, failOnUpdate, missingFields, updated } = require('./dictionary/statusMessages');

const validateLabNames = (labsIds, body) => {
  const emptyItemPosition = labsIds.findIndex((item) => !item);
  if (emptyItemPosition !== -1) {
    return { ...atLeastOneLabMissing, message:
      atLeastOneLabMissing.message.concat(body[emptyItemPosition].labName) };
  }
  return false;
};

const updateLabsByName = async (body) => {
  try {
    const requiredFields = ['labName', 'labNewName', 'newAddress'];
    if (!validateInputs(requiredFields, body)) return missingFields;
    const labsList = await getLabsByName(body);
    const missingLabInDb = validateLabNames(labsList, body);
    console.log(missingLabInDb)
    if (missingLabInDb) return missingLabInDb;
    const updateRes = await updLabsById(labsList, body);
    const allUpdated = updateRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnUpdate;
    return updated;
  } catch (err) {
    console.log(`error at services updateLabsByName: ${err}`);
    return err;
  }
};

module.exports = updateLabsByName;