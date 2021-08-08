const connection = require('./connection');

const associateTestsToLab = async (testsList, labId) => {
  try {
    const response = testsList.map((test) => connection
      .execute('DELETE FROM tests_laboratories '
        +'WHERE test_id=('
          +'SELECT id FROM tests WHERE test_name=? AND active=true'
        +') AND laboratory_id=?', [test.testName, labId]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at associateTestsToLab: ', err);
    return err;
  }
};

module.exports = associateTestsToLab;
