const connection = require('./connection');

const associateTestsToLab = async (testsList, labName) => {
  try {
    const response = testsList.map((test) => connection
      .execute('INSERT INTO tests_laboratories (test_id, laboratory_id) '
      + 'VALUES('
        + '(SELECT id FROM tests WHERE test_name=? AND active = true), '
        + '(SELECT id FROM laboratories WHERE lab_name=? AND active = true)'
      + ')', [test.testName, labName]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    // console.log('error at associateTestsToLab: ', err);
    return err;
  }
};

module.exports = associateTestsToLab;
