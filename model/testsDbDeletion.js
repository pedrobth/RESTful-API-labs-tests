const connection = require('./connection');

const testsDbDeletion = async (testsList) => {
  try {
    const response = testsList.map((test) => connection
      .execute('UPDATE tests SET tests.active=false WHERE id=?', [test.id]));
    const deletedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return deletedList;
  } catch (err) {
    console.log('error at testsDbDeletion: ', err);
    return err;
  }
};

module.exports = testsDbDeletion;