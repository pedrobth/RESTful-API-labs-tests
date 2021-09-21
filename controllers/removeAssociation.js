const { Router } = require('express');
const { associationDeletion } = require('../services');

const removeAssociation = Router();

removeAssociation.delete('/:labId', async (req, res, next) => {
  try {
    const { body, params } = req;
    const deletionResponse = await associationDeletion(body, params.labId);
    if (deletionResponse.err) return next(deletionResponse);
    const { message, status } = deletionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on removeAssociation controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = removeAssociation;
