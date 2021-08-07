const connection = require('./connection');

const assocDelByLabId = async (labsList) => {
  try {
    const response = labsList.map((lab) => connection
      .execute('DELETE FROM tests_laboratories '
        +'WHERE laboratory_id=?)', [lab.labId]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at assocDelByLabId: ', err);
    return err;
  }
};

module.exports = assocDelByLabId;
