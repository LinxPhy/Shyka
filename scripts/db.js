const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOSTNAME,       
    user: process.env.DATABASE_USER,   
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE 
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database');
});




module.exports = { connection };