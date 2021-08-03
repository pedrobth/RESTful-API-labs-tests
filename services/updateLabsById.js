const { updLabsById } = require('../model');
const { partialRequestSuceeded, validateInputs } = require('./helpers');
const statusMessages = require('./dictionary/statusMessages');


const updateLabsById = async (body) => {
  try {
    // usually update takes one item via params. I took a risk here doing something different than usual, to allow more than one update in a sigle request. This approach is easier to maintain since It have a sigle route to update one and many laboratories (update many was an extra feature).
    const requiredFields = ['labId', 'labName', 'address'];
    if (!validateInputs(requiredFields, body)) return statusMessages.missingFields;
  
    const updateRes = await updLabsById(body);
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