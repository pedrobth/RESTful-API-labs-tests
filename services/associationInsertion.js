const { associateTestsToLab, getLabsById, getTestsByName } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const associationInsertion = async (body, labId) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const testsSearch = await getTestsByName(body);
    const someTestNotInDb = testsSearch.some((t) => t === undefined);
    const lab = await getLabsById([{ labId: labId }]);
    if (someTestNotInDb || lab[0] === undefined) return statusMessages.idNotInDatabase
    
    const associationRes = await associateTestsToLab(body, labId);
    if (associationRes.code) return statusMessages[`${associationRes.code}`];
    return statusMessages.associationCreated;
  } catch (err) {
    console.log(`error at services associationInsertion: ${err}`);
    return err;
  }
};

module.exports = associationInsertion;
