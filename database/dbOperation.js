const db = require('../database/db');
const { QueryTypes } = require('sequelize');

class dbOperation {
  constructor(tableName, fieldOrder=1) {
    this.tableName = tableName;
    this.fieldOrder = fieldOrder;
  }

  async findAll() {
    try {
      const lista = await db.sequelize.query(
        `SELECT * FROM ${this.tableName} Order by ${this.fieldOrder}`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return lista;
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      throw error;
    }
  }
}

module.exports = dbOperation;