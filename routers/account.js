const express = require('express')
const router = express.Router()
const {
    insertAccount,
    updateAccount,
    getAllAccounts,
    deleteAccount,
    createAccount,
    getAccountById,
} = require('../contollers/account')

router.get('/account/list', getAllAccounts)

router.get('/account/delete/:id', deleteAccount)

router.route('/account/register').get(insertAccount).post(createAccount)

router.route('/account/edit/:id').get(getAccountById).post(updateAccount)

module.exports = router