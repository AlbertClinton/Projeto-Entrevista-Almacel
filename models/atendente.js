const db = require('../db')

class Atendente {
  constructor(id,nome) {
    this.id = id
    this.nome = nome
  }

  static getAtendente(id,callback){
    id = parseInt(id)
    db.getConnection(function(connection){
      connection.connect(function(err){
        if (err) throw err;
          connection.query("SELECT * FROM atendentes WHERE id=?",[id],function(err,result){
            if (err) throw err;
            return callback(result[0])
          })
      })
    })
  }
  static getAtendentes(callback){
    db.getConnection(function(connection){
      connection.connect(function(err){
        if (err) throw err;
          connection.query("SELECT * FROM atendentes ORDER BY id DESC",function(err,result){
            if (err) throw err;
            return callback(result)
          })
      })
    })
  }
}

module.exports = Atendente