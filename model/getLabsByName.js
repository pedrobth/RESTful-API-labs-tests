const connection = require('./connection');

const getLabsByName = async (labsNames) => {
  try {
    const response = labsNames.map((lab) => connection
      .execute('SELECT id, active FROM laboratories WHERE lab_name=?', [lab.labName]));
    const labsList = await Promise.all(response)
      .then((resp) => resp.map((e) => e[0][0]));
    return labsList;
  } catch (err) {
    console.log('error at model getLabsByName: ', err);
    return err;
  }
};

module.exports = getLabsByName;
