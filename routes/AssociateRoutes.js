const { Router } = require('express');
const { insertAssociation, removeAssociation } = require('../controllers');

const AssociateRoutes = Router();

AssociateRoutes.post('/:labId', insertAssociation);
AssociateRoutes.delete('/:labName', removeAssociation);

module.exports = AssociateRoutes;
