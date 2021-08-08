const { Router } = require('express');
const { associationDeletion } = require('../services');

const removeAssociation = Router();

// I did something unusual on this application. Update, delete and insert many was an extra feature. Those requisitions take the id via body instead of prarams. Since It has a single route to update one and many laboratories, this approach is easier to maintain.
removeAssociation.delete('/:labName', async (req, res, next) => {
  try {
    const { body, params } = req;
    const deletionResponse = await associationDeletion(body, params.labName);
    if (deletionResponse.err) return next(deletionResponse);
    const { message, status } = deletionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on removeAssociation controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = removeAssociation;
