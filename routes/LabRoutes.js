const { Router } = require('express');
const { getActiveLabs, insertLabs, removeLabs, updateLabs } = require('../controllers');

const LabsRoutes = Router();

// LabsRoutes.get('/', getActiveLabs);
// LabsRoutes.put('/', updateLabs);
LabsRoutes.post('/', insertLabs);
// LabsRoutes.delete('/', removeLabs);

module.exports = LabsRoutes;
