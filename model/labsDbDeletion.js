const connection = require('./connection');

const labsDbDeletion = async (labsList) => {
  try {
    const response = labsList.map((lab) => connection
      .execute('UPDATE laboratories SET laboratories.active=false WHERE lab_name=?', [lab.labName]));
    const deletedList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].affectedRows));
    return deletedList;
  } catch (err) {
    console.log('error at labsDbDeletion: ', err);
    return err;
  }
};

module.exports = labsDbDeletion;