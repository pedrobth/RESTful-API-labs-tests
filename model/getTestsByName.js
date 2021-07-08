const connection = require('./connection');

const getTestsByName = async (testsNames) => {
  try {
    const response = testsNames.map((test) => connection
      .execute('SELECT (id) FROM tests WHERE test_name=?', [test.oldName]));
    const testsList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0][0]));
    return testsList;
  } catch (err) {
    console.log('error at model getTestsByName: ', err);
    return err;
  }
};

module.exports = getTestsByName;