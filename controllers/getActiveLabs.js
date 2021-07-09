const { Router } = require('express');
const { allActiveLabs } = require('../services');

const getActiveLabs = Router();

getActiveLabs.get('/', async (_req, res, next) => {
  try {
    const allLabs = await allActiveLabs();
    if (allLabs.err) return next(allLabs)
    const { message, status } = allLabs;
    return res.status(status).json({ message });

  } catch (error) {
    console.log(`error on controller getActiveLabs ${error}`);
    return next({ error, status: 'internal server error' })
  }
})

module.exports = getActiveLabs;