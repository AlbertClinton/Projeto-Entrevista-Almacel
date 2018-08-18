const Cliente = require('./cliente')
const Atendente = require('./atendente')
const db = require('../db')
const dateformat = require('dateformat')

class Incidente {
    constructor( id, atendente, cliente, descricao, status, creation_time) {
      this.id = id
      this.atendente = atendente
      this.cliente = cliente
      this.descricao = descricao
      this.status = status
      this.creation_time = creation_time
    }

    toPost() {
      return {
        atendente: this.atendente.id,
        cliente: this.cliente.id,
        descricao: this.descricao,
        status: this.status,
        creation_time: dateformat(Date.now(),'yyyy-mm-dd HH:MM:ss')
      }
    }

    toPut() {
      return {
        id: this.id,
        atendente: this.atendente.id,
        cliente: this.cliente.id,
        descricao: this.descricao,
        status: this.status
      }
    }

    post(callback) {
      const body = this.toPost()
      db.getConnection(function(connection){
        connection.connect(function(err){
          if (err) throw err;
            connection.query("INSERT INTO incidentes SET ?",body,function(err,result){
              if (err) throw err;
              return callback(result.insertId)
            })
        })
      })
    }

    put(callback) {
      const body = this.toPut()
      db.getConnection(function(connection){
        connection.connect(function(err){
          if (err) throw err;
            connection.query("UPDATE incidentes SET atendente=?,cliente=?,descricao=?,status=? WHERE id=?",[body.atendente,body.cliente,body.descricao,body.status,body.id],function(err,result){
              if (err) throw err;
              return callback(body.id)
            })
        })
      })
    }

    delete(callback) {
      const id = this.id
      db.getConnection(function(connection){
        connection.connect(function(err){
          if (err) throw err;
            connection.query("DELETE FROM incidentes WHERE id=?",[id],function(err,result){
              if (err) throw err;
              return callback()
            })
        })
      })
    }

    static getIncidente(id,callback) {
      id = parseInt(id)
      db.getConnection(function(connection){
        connection.connect(function(err){
          if (err) throw err;
            connection.query("SELECT * FROM incidentes WHERE id=?",[id],function(err,incidentes){
              if (err) throw err;
              const incidente = incidentes[0]
              if(incidente) {
                Cliente.getCliente(incidente.cliente,function(cliente){
                  Atendente.getAtendente(incidente.atendente,function(atendente){
                    const result = new Incidente(incidente.id,atendente,cliente,incidente.descricao,incidente.status, incidente.creation_time)
                    return callback(result)
                  })
                })
              }else{
                console.log('Incidente não encontrado.')
              }
            })
        })
      })
    }

    static asyncFillIncidentes(incidente,callback) {
      Cliente.getCliente(incidente.cliente,function(cliente){
        Atendente.getAtendente(incidente.atendente,function(atendente){
          return callback( new Incidente(incidente.id,atendente,cliente,incidente.descricao,incidente.status,incidente.creation_time) )
        })
      })
    }

    static fillIncidentes(array,index,result,callback) {
      if(array.length <= index)
      {
        return callback(result)
      } else {
        Incidente.asyncFillIncidentes(array[index],function(incidente) {
          result.push(incidente)
          index++
          Incidente.fillIncidentes(array,index,result,function(incidentes){
            return callback(incidentes)
          })
        })
      }
    }

    static getIncidentes(callback) {
      db.getConnection(function(connection){
        connection.connect(function(err){
          if (err) throw err;
            connection.query("SELECT * FROM incidentes ORDER BY id ASC",function(err,result){
              if (err) throw err;
              Incidente.fillIncidentes(result,0,[],function(incidentes){
                return callback(incidentes)
              })
            })
        })
      })
    }
}

module.exports = Incidente