/**
 * Database configurate
 */
const Sequelize = require('sequelize')
const sequelize = new Sequelize('finance', 'postgres', 'postgres', {
    host: "localhost",
    dialect: "postgresql"
})

module.exports = {
    Sequelize,
    sequelize
}
