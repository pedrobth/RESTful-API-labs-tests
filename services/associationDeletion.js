const { removeAssociation } = require('../model');
const validateInputs = require('./helpers/validateInputs');
const statusMessages = require('./dictionary/statusMessages');

const associationDeletion = async (body, labId) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain. In that specific case (deletion) the application still working with tests name, but for exercise purpose it would be good to work with subqueries.
    const requiredFields = ['testName'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    const associationRes = await removeAssociation(body, labId);
    if (associationRes.code) return statusMessages[`${associationRes.code}`];
    const allUpdated = associationRes
      .find((insertion) => insertion === 0);
    if (allUpdated === 0) return statusMessages.zeroAffectedRows;
    return statusMessages.updated;
  } catch (err) {
    console.log(`error at services associationDeletion: ${err}`);
    return err;
  }
};

module.exports = associationDeletion;