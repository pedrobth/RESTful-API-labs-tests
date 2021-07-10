const { removeAssociation } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const associationDeletion = async (body, labName) => {
  try {
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const associationRes = await removeAssociation(body, labName);
    if (associationRes.code) return statusMessages[`${associationRes.code}`];
    return updated;
  } catch (err) {
    console.log(`error at services associationDeletion: ${err}`);
    return err;
  }
};

module.exports = associationDeletion;