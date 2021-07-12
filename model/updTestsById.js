const connection = require('./connection');

const updTestsById = async (testsList) => {
  try {
    const response = testsList.map((test) => connection
      .execute('UPDATE tests SET tests.test_name=?, tests.test_type=? '
        +'WHERE test_name=?',
      [test.testNewName, test.testNewType, test.testName]));
    const updateList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return updateList;
  } catch (err) {
    console.log('error at updTestsById: ', err);
    return err;
  }
};

module.exports = updTestsById;
