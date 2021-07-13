const connection = require('./connection');

const updLabsById = async (labsList) => {
  try {
    const response = labsList.map((lab) => connection
      .execute('UPDATE laboratories SET laboratories.lab_name=?, laboratories.address=? '
        +'WHERE lab_name=?',
      [lab.labNewName, lab.newAddress, lab.labName]));
    const updateList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return updateList;
  } catch (err) {
    console.log('error at updLabsById: ', err);
    return err;
  }
};

module.exports = updLabsById;
