const { labsDbDeletion, assocDelByLabName } = require('../model');
const statusMessages = require('./dictionary/statusMessages');
const { partialRequestSuceeded, validateInputs } = require('./helpers');


const labsDeletion = async (body) => {
  try {
    const requiredFields = ['labName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const deletionRes = await labsDbDeletion(body);
    console.log(deletionRes)
    if (deletionRes.code) return statusMessages[deletionRes.code];
    const allLabsDeleted = deletionRes
      .find((deletion) => deletion === 0);
    const assocRemovalRes = await assocDelByLabName(body);
    if (allLabsDeleted === 0) return partialRequestSuceeded(deletionRes, body, assocRemovalRes);
    return statusMessages.deleted;
  } catch (err) {
    console.log(`error at services labsDeletion: ${err}`);
    return err;
  }
};

module.exports = labsDeletion;
