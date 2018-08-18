//cria o servidor
const express = require('express')
const app = express()
const bodyParser  = require('body-parser');

//configura o body parser
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//configura o logger
const logger = require('morgan')
app.use(logger('dev'))

//configura o servidor statico
app.use(express.static('wwwroot'))

//configura as views
app.set('view engine', 'ejs')
app.set('views', './views')

//configura as rotas
const routes = require('./routes')
app.use('/', routes)


//inicia o servidor
app.listen(80, () => console.log('Application listening on port 80!'))
