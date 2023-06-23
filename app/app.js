const express = require("express")
const path = require('path')
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const indexRouters = require('../routers/index')
const accountRouters = require('../routers/account')

    //template engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));

    app.set('view engine', 'handlebars')

    //static
    app.use('/static', express.static(path.join(__dirname, 'public')));

    //body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //routers
    app.use(indexRouters)
    app.use(accountRouters)

    //runs
    app.listen(8081, function(){
        console.log("Servidor executando em http://localhost:8081")
    })