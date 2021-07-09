const { Router } = require('express');
const { insertAssociation, removeAssociation } = require('../controllers');

const AssociateRoutes = Router();

AssociateRoutes.post('/:labName', insertAssociation);
AssociateRoutes.delete('/:labName', removeAssociation);

module.exports = AssociateRoutes;
