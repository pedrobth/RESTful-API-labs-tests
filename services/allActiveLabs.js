const { getAllActiveLabs } = require('../model');
const { dbSearchReturnedEmpty } = require('./dictionary/statusMessages');

const allActiveLabs = async () => {
  try {
    const activeLabs = await getAllActiveLabs();
    return !activeLabs
      ? dbSearchReturnedEmpty : { message: activeLabs, status: 200 };
  } catch (err) {
    console.log(`error at services allActiveLabs: ${err}`);
    return err;
  }
};

module.exports = allActiveLabs;
