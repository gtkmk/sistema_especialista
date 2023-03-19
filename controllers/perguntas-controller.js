const mysql = require('../mysql');
const { query } = require('express');

exports.getPerguntas = async (req, res, next) => {
  try {
    const query = "SELECT * FROM perguntas WHERE id_projeto  = ?;";
    const result = await mysql.execute(query, [
      req.params.id_projeto
    ]);
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

exports.postCreatePergunta = async (req, res, next) => {
  try {
    const query = "INSERT INTO perguntas (pergunta, descricao, justificativa, id_projeto) VALUES (?,?,?,?)"
    const result = await mysql.execute(query, [
      req.body.pergunta,
      req.body.descricao,
      req.body.justificativa,
      req.params.id_projeto
    ]);
    const response = {
      mensagem: 'Pergunta criada com sucesso!',
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.deletePergunta = async (req, res, next) => {
  try {
    const query = "DELETE FROM perguntas WHERE id_projeto = ? AND id  = ?"
    await mysql.execute(query, [
      req.params.id_projeto,
      req.params.id
    ]);
    const response = {
      mensagem: 'Pergunta removida com sucesso',
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.getSinglePergunta = async (req, res, next) => {
  try {
    const query = "SELECT * FROM perguntas WHERE id_projeto  = ? AND id  = ?;";
    const result = await mysql.execute(query, [
      req.params.id_projeto,
      req.params.id
    ]);
    if (result.length > 0) {
      const response = {
        quantidade: result.length,
        pergunta: {
          id: result[0].id,
          pergunta: result[0].pergunta,
          descricao: result[0].descricao,
          id_projeto: result[0].id_projeto
        }
      }
      return res.status(200).send(response);
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

