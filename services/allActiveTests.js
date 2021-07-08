const { getAllActiveTests } = require('../model');
const { dbSearchReturnedEmpty } = require('./dictionary/statusMessages');

const allActiveTests = async () => {
  try {
    const activeTests = await getAllActiveTests();
    return !activeTests
      ? dbSearchReturnedEmpty : { message: activeTests, status: 200 };
  } catch (err) {
    console.log(`error at services allActiveTests: ${err}`);
    return err;
  }
};

module.exports = allActiveTests;
