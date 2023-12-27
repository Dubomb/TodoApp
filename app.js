var mysql = require('mysql2'); 
var fs = require('node:fs');

console.log('Connecting...');

const pass = fs.readFileSync('login.txt', 'utf-8');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pnapoli',
    password: pass,
    database: 'todo'
});

connection.connect((error) => {
    if (error) {
        console.log('Connection failed with error: ' + error.message);
        return;
    }

    connection.query('create database if not exists todo', (err) => {
        if (err) {
            console.log('Issue creating the database.');
            return;
        }
    });

    connection.query('use todo');

    connection.query('show tables', (err, results) => {
        if (results.length === 0) {
            const sqlQueries = fs.readFileSync('setup.sql', 'utf-8').split(';');
            sqlQueries.forEach((query) => {
                if (query.trim() === '') {
                    return;
                }

                connection.query(query.trim(), (err) => {
                    if (err) {
                        console.log('Issue creating database tables. ' + err.message);
                        return;
                    }
                });
            });
        }
    });

    console.log('Connection successful!');
});
