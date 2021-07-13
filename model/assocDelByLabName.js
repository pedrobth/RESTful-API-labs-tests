const connection = require('./connection');

const assocDelByLabName = async (labsList) => {
  try {
    const response = labsList.map((lab) => connection
      .execute('DELETE FROM tests_laboratories '
        +'WHERE laboratory_id=('
          +'SELECT id FROM laboratories WHERE lab_name=? AND active=true'
        +')', [lab.labName]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return insertedList;
  } catch (err) {
    console.log('error at assocDelByLabName: ', err);
    return err;
  }
};

module.exports = assocDelByLabName;
