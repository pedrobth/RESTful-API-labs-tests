const connection = require('./connection');

const associateTestsToLab = async (testsList, labId) => {
  try {
    const response = testsList.map((test) => connection
      .execute('INSERT INTO tests_laboratories (test_id, laboratory_id) VALUES(?, ?)', [test.id, labId]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at associateTestsToLab: ', err);
    // IMHO this does not follow the MSC architecture, but it was made as a quck fix to deliver the application at time.
    if (err.message.includes('Duplicate entry')) return 'alreadyAssociated';
    return err;
  }
};

module.exports = associateTestsToLab;
