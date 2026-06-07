const mysql = require("mysql2");

console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);
console.log("DB_NAME =", process.env.DB_NAME);

// connect to the mysql
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// MySQL se handshake karo
connection.connect((err) => {
    if (err) {
        console.error("Database Connection Error:", err);
        return;
    }

    console.log("Database Connected Successfully");
});

module.exports = connection;