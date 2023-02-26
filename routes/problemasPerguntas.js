const express = require('express');
const router = express.Router();

const ProblemasPerguntasController = require('../controllers/problemasPerguntas-controller');

//Retorna todos as perguntas de um problema
router.get(
  '/:id_problema',
  ProblemasPerguntasController.getRelacoesProblemaPerguntas
);

//Insere uma relação problema pergunta
router.post(
  '/:id_problema/:id_pergunta',
  ProblemasPerguntasController.postCreateRelacaoProblemaPergunta
);

module.exports = router;