const connection = require('./connection');

const updTestsById = async (testsList) => {
  try {
    console.log(testsList)
    const response = testsList.map((test) => connection
      .execute('UPDATE tests SET tests.test_name=?, tests.test_type=? '
        +'WHERE id=?',
      [test.testName, test.testType, test.testId]));
    const updateList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return updateList;
  } catch (err) {
    console.log('error at updTestsById: ', err);
    return err;
  }
};

module.exports = updTestsById;
