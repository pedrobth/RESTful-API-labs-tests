const connection = require('./connection');

const testsLabsDbDeletion = async (tests) => {
  try {
    const response = tests.map((test) => connection
      .execute('DELETE FROM tests_laboratories WHERE test_id=?', [test.id]));
    const deletionList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return deletionList;
  } catch (err) {
    console.log('error at testsLabsDbDeletion: ', err);
    return err;
  }
};

module.exports = testsLabsDbDeletion;