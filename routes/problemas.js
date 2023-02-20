const express = require('express');
const router = express.Router();

const ProblemasController = require('../controllers/problemas-controller');

//Retorna todos os problemas
router.get(
  '/:id_projeto',
  ProblemasController.getProblemas
);

//Insere um problema
router.post(
  '/:id_projeto',
  ProblemasController.postCreateProblema
);

//Remove um problema
router.delete(
  '/:id_projeto/:id',
  ProblemasController.deleteProblema
);

// //Retorna sobre um problema
router.get(
  '/:id_projeto/:id',
  ProblemasController.getSingleProblema
);

module.exports = router;