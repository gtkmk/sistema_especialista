const express = require('express');
const router = express.Router();

const ProblemasPerguntasController = require('../controllers/problemasPerguntas-controller');

//Retorna todos as perguntas de um problema
router.get(
  '/:id_problema',
  ProblemasPerguntasController.getRelacoesProblemaPerguntas
);

//Retorna todos as perguntas de um projeto
router.get(
  '/all/:id_projeto',
  ProblemasPerguntasController.getRelacoesProjeto
)

//Insere uma relação problema pergunta
//Caso de uso: relacionar uma pergunta a um problema.
router.post(
  '/:id_projeto/:id_problema/:id_pergunta',
  ProblemasPerguntasController.postCreateRelacaoProblemaPergunta
);

module.exports = router;