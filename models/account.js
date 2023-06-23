const db = require('../database/db')


const Account = db.sequelize.define('account', {
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true,
        defaultValue: null,
        validate: {
            notEmpty: {msg: "Informe um valor válido."},
            notNull: {msg: "Informe um valor válido."}
        }
    },
    active: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: db.Sequelize.STRING(1)
    },
    
})

module.exports = Account