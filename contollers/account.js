const accountService = require("../service/account")


function extractErrorMsg(msg) {
    return new Promise((resolve, reject) => {
        try {
            const erroMsg = msg.replace('Validation', '').replace('error', '').replace(':', '').trim();
            const titleMsg = (msg.includes('Validation')) && !erroMsg? 'Erro na validação dos dados!' : '';
            const result = `${titleMsg} ${erroMsg}`
            resolve(result)
        } catch (err) {
            reject('Erro de extração de texto: ' + $(err))
        }
    });
}

async function render_template(res, msgAlert, form, action, id, insert=false) {
    let accounts = null;
    if (id !== 0) {
        accounts = JSON.parse(JSON.stringify(await accountService.getAccountById(id)));
    } else if (insert) {
        accounts = null
    } else if (form !== 'register') {
        accounts = await accountService.getAllAccounts('accounts', 'name');
    }

    try {
        await extractErrorMsg(msgAlert).then((message) => {
            res.render('accounts/'+form, {
                message: message,
                colorMsg: msgAlert.includes('error') === true? 'red white-text' : 'green black-text lighten-4',
                iconMsg: msgAlert.includes('error') === true? false : true,
                edit: action,
                data: accounts
            });
        });
    } catch (err) {
        console.log(err)
    }
};

exports.createAccount = async (req, res) => {
    try {
        await accountService.createAccount(req.body);
        render_template(res, 'Registro salvo com sucesso!', req.body.editContinue, false, 0);
    } catch (err) {
        render_template(res, err.message, 'register', false, 0);
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await accountService.deleteAccount(req.params.id)
        render_template(res, 'Registro excluído com sucesso!', 'list', false, 0);
    } catch (err) {
        render_template(res, err.message, 'list', false, 0);
    }
};

exports.updateAccount = async (req, res) => {
    console.log('aqui')
    try {
        data = {
            name: req.body.name,
            active: req.body.active
        }
        await accountService.updateAccount(req.params.id, data);
        render_template(res, 'Registro alterado com sucesso!', req.body.editContinue, false, 0);
    } catch (err) {
        render_template(res, err.message, 'register', false, 0);
    }
};

exports.insertAccount = async (req, res) => render_template(res, '', 'register', false, 0, true);

exports.getAllAccounts = async (req, res) => render_template(res, '', 'list', false, 0);

exports.getAccountById = async (req, res) => render_template(res, '', 'register', true, req.params.id);
