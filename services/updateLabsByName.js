const { updLabsByName } = require('../model');
const { partialRequestSuceeded, validateInputs } = require('./helpers');
const statusMessages = require('./dictionary/statusMessages');


const updateLabsByName = async (body) => {
  try {
    const requiredFields = ['labName', 'labNewName', 'newAddress'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
  
    const updateRes = await updLabsByName(body);
    if (updateRes.code || updateRes.errno === 3819) {
      return (statusMessages[`${updateRes.code}`] || statusMessages.ER_BAD_INPUT)
    };
    const allUpdated = updateRes
      .find((insertion) => insertion === 0);
    if (allUpdated === 0) return partialRequestSuceeded(updateRes, body);
    return statusMessages.updated;
  } catch (err) {
    console.log(`error at services updateLabsByName: ${err}`);
    return err;
  }
};

module.exports = updateLabsByName;