const connection = require('./connection');

const getAllActiveTests = async () => {
  try {
    const [activeTestsResp] = await connection.execute('SELECT * FROM tests WHERE active=1');
    return activeTestsResp;
  } catch (err) {
    console.log(`err at model getAllActiveTests: ${err}`);
    return err;
  }
};

module.exports = getAllActiveTests;
