const express = require('express');
const router = express.Router();
const resenaController = require('../BackEnd/controllers/resenaController');

router.post('/', resenaController.crearResena);
router.get('/', resenaController.obtenerResena);
router.get('/:id', resenaController.obtenerResenaPorId);
router.put('/:id', resenaController.actualizarResena);
router.delete('/:id', resenaController.eliminarResena);

module.exports = router;
