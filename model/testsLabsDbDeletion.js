const connection = require('./connection');

const testsLabsDbDeletion = async (testId) => {
  try {
    const response = connection.execute('DELETE FROM tests_laboratories WHERE test_id=?', testId);
    const deletionRes = await response;
    return deletionRes[0].affectedRows;
  } catch (err) {
    console.log('error at testsLabsDbDeletion: ', err);
    return err;
  }
};

module.exports = testsLabsDbDeletion;