const { testsDbInsertion } = require('../model');
const { created, failOnInsertion } = require('./dictionary/statusMessages');

const testsInsertion = async (body) => {
  try {
    const insertionRes = await testsDbInsertion(body);
    const allUpdated = insertionRes
      .find((insertion) => insertion === 0);
    if (allUpdated) return failOnInsertion;
    return created;
  } catch (err) {
    console.log(`error at services testsInsertion: ${err}`);
    return err;
  }
};

module.exports = testsInsertion;
