//index.js
(async () => {
    const Account = require("../models/account")

    try {
        const resultado = await Account.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();