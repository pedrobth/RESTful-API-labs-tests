const connection = require('./connection');

const testsDbInsertion = async (body) => {
  try {
    const response = body.map((test) => connection
      .execute('INSERT INTO tests (test_name, test_type) VALUES(?, ?)', [test.testName, test.testType]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at testsDbInsertion: ', err);
    return err;
  }
};

module.exports = testsDbInsertion;