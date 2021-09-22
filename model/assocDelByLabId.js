const connection = require('./connection');

const assocDelByLabId = async (labId) => {
  try {
    const response = connection.execute('DELETE FROM tests_laboratories '
        +'WHERE laboratory_id=?', labId);
    const deleted = await response
    console.log('asssocDelBy:', deleted)
    return deleted[0];
  } catch (err) {
    console.log('error at assocDelByLabId: ', err);
    return err;
  }
};

module.exports = assocDelByLabId;
