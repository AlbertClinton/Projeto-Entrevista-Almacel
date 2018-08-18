const express = require('express')
const router = express.Router()
const dateformat = require('dateformat')
const Incidente = require('../models/incidente')
const Cliente = require('../models/cliente')
const Atendente = require('../models/atendente')

function getIncidente(req, res) {
  Incidente.getIncidentes(function(incidentes){
    Cliente.getClientes(function(clientes){
      Atendente.getAtendentes(function(atendentes){
        const id = req.query.id || req.params.id
        if(id) {
          Incidente.getIncidente(id,function(incidente){
            return  res.render('index',{
              atendentes: atendentes,
              clientes: clientes,
              incidentes: incidentes,
              incidente: incidente,
              creation_date_string: dateformat(incidente.creation_date,"hh:MM TT - dd/mm/yyyy")
            })
          })
        } else {
          return  res.render('index',{
            atendentes: atendentes,
            clientes: clientes,
            incidentes: incidentes,
            incidente: new Incidente(),
            creation_date_string: null
          })
        }
      })
    })
  })
}

function postIncidente(req, res) {
  const body = req.body
  const incidente = new Incidente(
    null,
    new Atendente(body.atendente),
    new Cliente(body.cliente),
    body.descricao,
    body.status
  )
  incidente.post(function(id){
    return res.redirect('/' + id)
  })
}

function putIncidente(req, res) {
  const body = req.body
  const incidente = new Incidente(
    body.id,
    new Atendente(body.atendente),
    new Cliente(body.cliente),
    body.descricao,
    body.status
  )
  incidente.put(function(id){
    return res.redirect('/' + id)
  })
}

function deleteIncidente(req, res) {
  const body = req.body
  const incidente = new Incidente(body.id)
  incidente.delete(function(){
    return res.redirect('/')
  })
}

router.get('/', getIncidente)
router.get('/:id', getIncidente)
router.post('/',function(req, res){
  switch(req.body.method) {
    case 'POST':
      return postIncidente(req,res)
    break;
    case 'PUT':
      return putIncidente(req,res)
    break;
    case 'DELETE':
      return deleteIncidente(req,res)
    break;
    default:
      throw 'Método inválido!'
  }
  //POST
  //PUT
  //DELETE
})

module.exports = router