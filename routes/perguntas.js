const express = require('express');
const router = express.Router();

const PerguntasController = require('../controllers/perguntas-controller');

//Retorna todos as pergunta
router.get(
  '/:id_projeto',
  PerguntasController.getPerguntas
);

//Insere uma pergunta
router.post(
  '/:id_projeto',
  PerguntasController.postCreatePergunta
);

//Remove uma pergunta
router.delete(
  '/:id_projeto/:id',
  PerguntasController.deletePergunta
);

// //Retorna sobre uma pergunta
router.get(
  '/:id_projeto/:id',
  PerguntasController.getSinglePergunta
);

module.exports = router;