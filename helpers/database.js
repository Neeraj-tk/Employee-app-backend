const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "demodb"
});

connection.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("successfuly connected to db");
  }
});

module.exports = connection;
