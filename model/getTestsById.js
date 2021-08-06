const connection = require('./connection');

const getTestsById = async (idsList) => {
  try {
    const response = idsList.map((test) => connection
      .execute('SELECT id FROM tests WHERE id=?', [test.testId]))
    const testsList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0][0]));
    return testsList;
  } catch (err) {
    console.log('error at getTestsById: ', err);
    return err;
  }
};

module.exports = getTestsById;