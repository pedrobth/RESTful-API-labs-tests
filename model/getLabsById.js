const connection = require('./connection');

const getLabsById = async (idsList) => {
  try {
    const response = idsList.map((lab) => connection
      .execute('SELECT id FROM laboratories WHERE id=?', [lab.labId]))
    const labsList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0][0]));
    return labsList;
  } catch (err) {
    console.log('error at getLabsById: ', err);
    return err;
  }
};

module.exports = getLabsById;