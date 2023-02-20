const mysql = require('../mysql');
const { query } = require('express');

exports.getProblemas = async (req, res, next) => {
  try {
    const query = "SELECT * FROM problemas WHERE id_projeto  = ?;";
    const result = await mysql.execute(query, [
      req.params.id_projeto
    ]);
    if (result.length > 0) {
      const response = {
        quantidade: result.length,
        problemas: result.map(problema => {
          return {
            id: problema.id,
            nome: problema.problema,
            id_projeto: problema.id_projeto
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

exports.postCreateProblema = async (req, res, next) => {
  try {
    const query = "INSERT INTO problemas (problema, id_projeto) VALUES (?,?)"
    const result = await mysql.execute(query, [
      req.body.problema,
      req.params.id_projeto
    ]);
    const response = {
      mensagem: 'Problema criado com sucesso!',
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.deleteProblema = async (req, res, next) => {
  try {
    const query = "DELETE FROM problemas WHERE id_projeto = ? AND id  = ?"
    await mysql.execute(query, [
      req.params.id_projeto,
      req.params.id
    ]);
    const response = {
      mensagem: 'Conta removida com sucesso',
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.getSingleProblema = async (req, res, next) => {
  try {
    const query = "SELECT * FROM problemas WHERE id_projeto  = ? AND id  = ?;";
    const result = await mysql.execute(query, [
      req.params.id_projeto,
      req.params.id
    ]);
    if (result.length > 0) {
      const response = {
        quantidade: result.length,
        problemas: {
          id: result[0].id,
          nome: result[0].problema,
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

