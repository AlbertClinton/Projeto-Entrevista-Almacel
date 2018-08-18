const db = require('../db')

class Cliente {
  constructor(id,nome,empresa) {
    this.id = id
    this.nome = nome
    this.empresa = empresa
  }

  static getCliente(id,callback){
    id = parseInt(id)
    db.getConnection(function(connection){
      connection.connect(function(err){
        if (err) throw err;
          connection.query("SELECT * FROM clientes WHERE id=?",[id],function(err,result){
            if (err) throw err;
            return callback(result[0])
          })
      })
    })
  }

  static getClientes(callback){
    db.getConnection(function(connection){
      connection.connect(function(err){
        if (err) throw err;
          connection.query("SELECT * FROM clientes ORDER BY id DESC",function(err,result){
            if (err) throw err;
            return callback(result)
          })
      })
    })
  }
}

module.exports = Cliente