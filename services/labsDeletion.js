const { labsDbDeletion, assocDelByLabId } = require('../model');
const statusMessages = require('./dictionary/statusMessages');


const labsDeletion = async (labId) => {
  try {
    console.log('labId: ', labId)
    if (!parseInt(labId)) return statusMessages.missingFields;
    const deletionRes = await labsDbDeletion([labId]);
    console.log('deletuionRes: ', deletionRes)
    if (deletionRes.code) return statusMessages[deletionRes.code];
    if (deletionRes === 0) return statusMessages.zeroAffectedRows;
    const assocRemovalRes = await assocDelByLabId([labId]);
    if (assocRemovalRes.affectedRows === 0) return statusMessages.labDeletedNoAssiciationFound;
    return statusMessages.deleted;
  } catch (err) {
    console.log(`error at services labsDeletion: ${err}`);
    return err;
  }
};

module.exports = labsDeletion;
