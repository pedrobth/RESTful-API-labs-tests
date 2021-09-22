const connection = require('./connection');

const labsDbDeletion = async (labId) => {
  try {
    const response = connection
      .execute('UPDATE laboratories SET laboratories.active=false WHERE id=?', labId);
    const deleted = await response
    return deleted[0].affectedRows;
  } catch (err) {
    console.log('error at labsDbDeletion: ', err);
    return err;
  }
};

module.exports = labsDbDeletion;