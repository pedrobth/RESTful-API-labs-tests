const connection = require('./connection');

const testsDbDeletion = async (testId) => {
  try {
    const response = connection.execute('UPDATE tests SET tests.active=false WHERE id=?', testId);
    const deletedRes = await response;
    return deletedRes[0].affectedRows;
  } catch (err) {
    console.log('error at testsDbDeletion: ', err);
    return err;
  }
};

module.exports = testsDbDeletion;