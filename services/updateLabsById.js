const { getLabsById, updLabsById } = require('../model');
const { partialRequestSuceeded, validateInputs } = require('./helpers');
const statusMessages = require('./dictionary/statusMessages');


const updateLabsById = async (body) => {
  try {
    // I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain..
    const requiredFields = ['labId', 'labName', 'address'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
    
    const labsExist = await getLabsById(body);
    if (labsExist.some((id) =>  id === undefined)) return statusMessages.ER_BAD_INPUT
    const updateRes = await updLabsById(body);
    console.log(updateRes)
    if (updateRes.code || updateRes.errno === 3819) {
      return (statusMessages[`${updateRes.code}`] || statusMessages.ER_BAD_INPUT)
    };
    const allUpdated = updateRes
      .find((insertion) => insertion === 0);
    if (allUpdated === 0) return partialRequestSuceeded(updateRes, body);
    return statusMessages.updated;
  } catch (err) {
    console.log(`error at services updateLabsById: ${err}`);
    return err;
  }
};

module.exports = updateLabsById;