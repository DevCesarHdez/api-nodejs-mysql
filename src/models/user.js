const mysql = require('mysql');

connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "MIWOmbtZpP",
  password: "UEVIjDbIt9",
  database: "MIWOmbtZpP"
})

let userModel = {};

userModel.getUsers = (callback) => {
  if (connection) {
    connection.query(
      'SELECT * FROM users',
      (err, rows) => {
        if (err) {
          throw err;
        } else {
          callback(null, rows);
        }
      }
    )
  }
}

userModel.insertUser = (userData, callback) => {
  if (connection) {
    connection.query(
      'INSERT INTO users SET ?',userData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            'InsertId': result.insertId
          });
        }
      }
    )
  }
}

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const { id, username, email, password } = userData;
    const updateData = {
      username,
      email,
      password
    }

    connection.query('UPDATE users SET ? WHERE id = ?', [updateData, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, {
          msg: "updated",
          success: true
        })
      }
    })
  }
}

userModel.deleteUser = ( id, callback ) => {
  if (connection) {
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        throw err;
      }else if (result.affectedRows == 1) {
        callback(null, {
          success: true,
          msg: "user delete"
        })
      }else {
        callback( null, {
          success: true,
          msg: "Usuatio no encontrado"
        })
      }
    })
  }
}

module.exports = userModel;
