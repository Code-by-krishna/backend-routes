const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

db.connect((err) => {
    if(err) {
        console.log("Error",err);
    }else{
        console.log("Connected to database!!");
    }
})

module.exports = db;