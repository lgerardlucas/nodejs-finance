const accountService = require("../service/account")


function extractErrorMsg(msg) {
    return new Promise((resolve, reject) => {
        try {
            const erroMsg = msg.replace('Validation', '').replace('error', '').replace(':', '').trim();
            const titleMsg = (msg.includes('Validation')) && !erroMsg? 'Erro na validação dos dados!' : '';
            const result = `${titleMsg} ${erroMsg}`
            resolve(result.trim())
        } catch (err) {
            reject('Erro de extração de texto: ' + $(err))
        }
    });
}

async function render_template(res, msg, form, edit, id, data) {
    try {
        await extractErrorMsg(msg).then((message) => {
            res.render('accounts/'+form, {
                message: message,
                colorMsg: msg.includes('error') === true ? 'red white-text' : 'green black-text lighten-4',
                iconMsg: msg.includes('error') === true ? false : true,
                edit: edit,
                data: data
            });
        });
    } catch (err) {
        console.log(err)
    }
};

async function manipulationData(res, req, action, data, msg, id=0) {
    try {
        if (action === 'list') {
            await accountService.getAllAccounts('accounts', 'name').then((accounts) => {
                form = req.body.editContinue !== undefined ? req.body.editContinue : 'list'
                render_template(res, msg, form, false, 0, accounts);
            })
        } else if (action === 'add') {
            await accountService.createAccount(data).then(() => {
                manipulationData(res, req, 'list', {}, msg, 0)
            })

        } else if (action === 'del') {
            await accountService.deleteAccount(req.params.id).then(() => {
                manipulationData(res, req, 'list', {}, msg, 0)
            })
        } else if (action === 'update') {
            if (id > 0) {
                await accountService.getAccountById(id).then((accounts) => {
                    render_template(res, '', 'register', true, 0, JSON.parse(JSON.stringify(accounts)))
                })
            } else {
                await accountService.updateAccount(req.params.id, data).then(() => {
                    manipulationData(res, req, 'list', {}, msg, 0)
                })
            }
        } else if (action === 'insert') {
            render_template(res, '', 'register', false, 0, true);
        }
    } catch (err) {
        const form = action.includes('add') || action.includes('update') ? 'register' : 'list'
        render_template(res, err.message, form, false, 0);
    }
}

exports.createAccount = async (req, res) => await manipulationData(res, req, 'add', req.body, 'Registro salvo com sucesso!');

exports.deleteAccount = async (req, res) => await manipulationData(res, req, 'del', {}, 'Registro excluído com sucesso!');

exports.updateAccount = async (req, res) => await manipulationData(res, req, 'update', req.body, 'Registro alterado com sucesso!');

exports.insertAccount = async (req, res) => await manipulationData(res, req, 'insert', {}, '')

exports.getAllAccounts = async (req, res) => await manipulationData(res, req, 'list', {}, '')

exports.getAccountById = async (req, res) => await manipulationData(res, req, 'update', {}, '', req.params.id);
