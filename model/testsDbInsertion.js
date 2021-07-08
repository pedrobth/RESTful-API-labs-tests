const connection = require('./connection');

const testsDbInsertion = async (body) => {
  try {
    const response = body.map((test) => connection
      .execute('INSERT INTO tests (test_name, test_type) VALUES(?, ?)', [test.testName, test.testType]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => {
        console.log(e)
        return e[0]}));
    return insertedList;
  } catch (err) {
    console.log('error at updTestsById: ', err);
    return err;
  }
};

module.exports = testsDbInsertion;