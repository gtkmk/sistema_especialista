const mysql = require('../mysql');
const { query } = require('express');

exports.getProjetos = async (req, res, next) => {
  try {
    const query = "SELECT * FROM projeto;";
    const result = await mysql.execute(query, []);
    const response = {
      quantidade: result.length,
      projetos: result.map(projeto => {
        return {
          id: projeto.id,
          nome: projeto.nome
        }
      })
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

exports.postCreateProjeto = async (req, res, next) => {
  try {
    const query = "INSERT INTO projeto (nome) VALUES (?)"
    const result = await mysql.execute(query, [
      req.body.nome
    ]);
    const response = {
      mensagem: 'Projeto criado com sucesso!',
    }
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.getSingleProjeto = async (req, res, next) => {
  try {
    const query = "SELECT * FROM projeto WHERE id = ?;";
    const result = await mysql.execute(query, [
      req.params.id
    ]);
    const response = {
      projeto: {
        id: result[0].id,
        nome: result[0].nome
      }
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }

}