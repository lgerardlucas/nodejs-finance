const Account = require("../models/account");
const DbOperation = require('../database/dbOperation');


exports.getAllAccounts = async (tableName, fieldOrder=1) => {
    try {
        const operation = new DbOperation(tableName, fieldOrder)
        return await operation.findAll();
    } catch (err) {
        throw Error(err.message)
    }
};

exports.createAccount = async (account) => {
    try {
        await Account.create(account);
    } catch (err) {
        throw Error(err.message)
    }
};

exports.getAccountById = async (id) => {
    try {
        return await Account.findOne({
            where: {id: id}
        });
    } catch (err) {
        throw Error(err.message)
    }
};

exports.updateAccount = async (id, account) => {
    const {name, active} = account;
    try {
        await Account.update({
            name: name,
            active: active
        } , {
            where: {id: id}
        });
    } catch (err) {
        throw Error(err.message)
    }
};

exports.deleteAccount = async (id) => {
    try {
        await Account.destroy({ 
            where: {id: id}
        });
    } catch (err) {
        throw Error(err.message)
    }
};
