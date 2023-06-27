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

async function render_template(res, msg, form, edit, id, insert=false) {
    let form_use = form;
    let accounts = id !== 0 ? JSON.parse(JSON.stringify(await accountService.getAccountById(id))) : {}
    if (!insert && id === 0) {
        accounts = await accountService.getAllAccounts('accounts', 'name');
        form_use = Object.entries(accounts).length === 0 ? 'register' : form;
    }

    try {
        await extractErrorMsg(msg).then((message) => {
            res.render('accounts/'+form_use, {
                message: message,
                colorMsg: msg.includes('error') === true ? 'red white-text' : 'green black-text lighten-4',
                iconMsg: msg.includes('error') === true ? false : true,
                edit: edit,
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
