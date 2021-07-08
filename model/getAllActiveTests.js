const connection = require('./connection');

const getAllActiveTests = async () => {
  try {
    // id and status(active or inactive) present in returned data, depending on the application use if might be better to keep that information, E.g. 'SELECT (test_name, test_type) FROM tests WHERE active=true'
    const [activeTestsResp] = await connection.execute('SELECT * FROM tests WHERE active=true');
    return activeTestsResp;
  } catch (err) {
    console.log(`err at model getAllActiveTests: ${err}`);
    return err;
  }
};

module.exports = getAllActiveTests;
