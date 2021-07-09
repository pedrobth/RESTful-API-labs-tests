const connection = require('./connection');

const labsDbInsertion = async (body) => {
  try {
    const response = body.map((lab) => connection
      .execute('INSERT INTO laboratories (lab_name, address) VALUES(?, ?)', [lab.labName, lab.address]));
    const insertedList = await Promise.all(response)
      .then((resp) => resp.map((e) => ({
        afectedRows: e[0].affectedRows,
        id: e[0].insertId,
      })));
    return insertedList;
  } catch (err) {
    console.log('error at labsDbInsertion: ', err);
    return err;
  }
};

module.exports = labsDbInsertion;