const connection = require('./connection');

const getAllActiveLabs = async () => {
  try {
    // id and status(active or inactive) present in returned data, depending on the application use if might be better to keep that information, E.g. 'SELECT (test_name, test_type) FROM Labs WHERE active=true'
    const [activeLabsResp] = await connection.execute('SELECT * FROM laboratories WHERE active=true');
    return activeLabsResp;
  } catch (err) {
    console.log(`err at model getAllActiveLabs: ${err}`);
    return err;
  }
};

module.exports = getAllActiveLabs;
