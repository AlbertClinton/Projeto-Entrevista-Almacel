const mysql = require('mysql')

class db {
  static getConnection(callback) {
    const config = {
      host: 'localhost',
      user: 'root',
      password: 'P@ssw0rd',
      database: "incidentes"
    }    
    return callback(mysql.createConnection(config))
  }
}

module.exports = db