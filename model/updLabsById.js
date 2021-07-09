const connection = require('./connection');

const updLabsById = async (labs, body) => {
  try {
    const response = labs.map((lab, index) => connection
      .execute('UPDATE laboratories SET laboratories.lab_name=?, laboratories.address=? WHERE id=?', [body[index].labNewName, body[index].newAddress, lab.id]));
    const updateList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0].changedRows));
    return updateList;
  } catch (err) {
    console.log('error at updLabsById: ', err);
    return err;
  }
};

module.exports = updLabsById;
