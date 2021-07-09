const { labsDbInsertion } = require('../model');
const { created, failOnInsertion } = require('./dictionary/statusMessages');

const labsInsertion = async (body) => {
  try {
    const insertionRes = await labsDbInsertion(body);
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnInsertion;
    return created;
  } catch (err) {
    console.log(`error at services labsInsertion: ${err}`);
    return err;
  }
};

module.exports = labsInsertion;
