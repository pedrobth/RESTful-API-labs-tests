const { labsDbDeletion, assocDelByLabName } = require('../model');
const statusMessages = require('./dictionary/statusMessages');
const { partialRequestSuceeded, validateInputs } = require('./helpers');


const labsDeletion = async (body) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain..
    const requiredFields = ['labId'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const deletionRes = await labsDbDeletion(body);
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
