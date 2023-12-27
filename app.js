var mysql = require('mysql2'); 
var fs = require('node:fs');

console.log('Connecting...');

const pass = fs.readFileSync('login.txt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: pass,
    database: 'todo'
});

connection.connect((error) => {
    if (error) {
        console.log('Connection failed with error: ' + error.message);
        return;
    }

    console.log('Connection successful!');

    connection.end();
});
