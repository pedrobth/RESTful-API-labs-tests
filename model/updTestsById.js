const connection = require('./connection');

const gettestsById = async (tests, body) => {
  try {
    const response = tests.map((test, index) => connection
      .execute('UPDATE tests SET tests.test_name=?, tests.test_type=? WHERE id=?', [body[index].testNewName, body[index].testNewType, test.id]));
    const updateList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return updateList;
  } catch (err) {
    console.log('error at updTestsById: ', err);
    return err;
  }
};

module.exports = gettestsById;