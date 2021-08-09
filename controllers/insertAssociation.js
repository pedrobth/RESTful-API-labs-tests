const { Router } = require('express');
const { associationInsertion } = require('../services');

const insertAssociation = Router();

insertAssociation.post('/:labId', async (req, res, next) => {
  try {
    const { body, params } = req;
    const insertionResponse = await associationInsertion(body, params.labId);
    if (insertionResponse.err) return next(insertionResponse);
    const { message, status } = insertionResponse;
    return res.status(status).json({ message });
  } catch (error) {
    console.log('error on insertAssociation controller: ', error);
    return next({ error, status: 'internal server error' });
  }
});

module.exports = insertAssociation;
