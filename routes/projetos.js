const express = require('express');
const router = express.Router();

const ProjetosController = require('../controllers/projetos-controller');

//Retorna todos as projetos
router.get(
  '/',
  ProjetosController.getProjetos
);

//Insere um projeto
router.post(
  '/',
  ProjetosController.postCreateProjeto
);

//Retorna sobre um projeto
router.get(
  '/:id',
  ProjetosController.getSingleProjeto
);

module.exports = router;