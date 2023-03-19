const mysql = require('../mysql');
const { query } = require('express');

exports.getRelacoesProblemaPerguntas = async (req, res, next) => {
  try {
    const query = `SELECT perguntas.*
                   FROM perguntas
                   JOIN problemas_perguntas ON perguntas.id = problemas_perguntas.id_pergunta
                   WHERE problemas_perguntas.id_problema = ?`;
    const result = await mysql.execute(query, [req.params.id_problema]);
    if (result.length > 0) {
      const response = {
        quantidade: result.length,
        perguntas: result.map(pergunta => {
          return {
            id: pergunta.id,
            pergunta: pergunta.pergunta,
            descricao: pergunta.descricao,
            id_projeto: pergunta.id_projeto
          }
        })
      }
      return res.status(200).send(response);
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

exports.postCreateRelacaoProblemaPergunta = async (req, res, next) => {
  try {
    const query = "INSERT INTO problemas_perguntas (id_problema, id_pergunta, id_projeto ) VALUES (?,?,?)"
    const result = await mysql.execute(query, [
      req.params.id_problema,
      req.params.id_pergunta,
      req.params.id_projeto
    ]);
    const response = {
      mensagem: 'Relação problema-pergunta criada com sucesso!',
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.getRelacoesProjeto = async (req, res, next) => {
  try {
    const query = `SELECT perguntas.*, problemas_perguntas.id_problema, problemas.problema as problema_descricao
                   FROM perguntas
                   JOIN problemas_perguntas ON perguntas.id = problemas_perguntas.id_pergunta
                   JOIN problemas ON problemas_perguntas.id_problema = problemas.id
                   WHERE problemas.id_projeto = ?`;
    const result = await mysql.execute(query, [req.params.id_projeto]);
    if (result.length > 0) {
      const response = {
        quantidade: result.length,
        relações: result.map(pergunta => {
          return {
            id: pergunta.id,
            pergunta: pergunta.pergunta,
            descricao: pergunta.descricao,
            justificativa: pergunta.justificativa,
            id_projeto: pergunta.id_projeto,
            id_problema: pergunta.id_problema,
            problema_descricao: pergunta.problema_descricao
          }
        })
      }
      return res.status(200).send(response);
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}