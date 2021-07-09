const { Router } = require('express');
const { getActiveLabs, insertLabs, removeLabs, updateLabs } = require('../controllers');

const LabRoutes = Router();

LabRoutes.get('/', getActiveLabs);
LabRoutes.put('/', updateLabs);
LabRoutes.post('/', insertLabs);
// LabRoutes.delete('/', removeLabs);

module.exports = LabRoutes;
