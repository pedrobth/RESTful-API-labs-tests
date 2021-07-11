const connection = require('./connection');

const associateTestsToLab = async (testsList, labName) => {
  try {
    const response = testsList.map((test) => connection
      .execute('DELETE FROM tests_laboratories '
        +'WHERE test_id=('
          +'SELECT id FROM tests WHERE test_name=? AND active=true'
        +') AND laboratory_id=('
          +'SELECT id FROM laboratories WHERE lab_name=? AND active=true'
        +')', [test.testName, labName]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at associateTestsToLab: ', err);
    // IMHO this does not follow the MSC architecture, but it was made as a quck fix to deliver the application on time.
    // if (err.message.includes('Duplicate entry')) return 'alreadyAssociated';
    return err;
  }
};

module.exports = associateTestsToLab;
