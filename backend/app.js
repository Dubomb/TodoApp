const mysql = require('mysql2');

const fs = require('node:fs');

const cors = require('cors');

const express = require('express');
const expressApp = express();
const port = 3001;

expressApp.use(cors());
expressApp.use(express.json());

require('./routes/taskRoutes')(expressApp);
require('./routes/categoryRoutes')(expressApp);


expressApp.get('/status', (req, res) => {
    res.json({message: 'The server is ready.'});
});


expressApp.listen(port, () => {
    console.log('Server running on ' + port);
});


const pass = fs.readFileSync('login.txt', 'utf-8');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pnapoli',
    password: pass,
    database: 'todo',
});


expressApp.set('connection', connection);

console.log('Connecting...');


connection.connect((error) => {
    if (error) {
        console.log('Connection failed with error: ' + error.message);
        return;
    }
});


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
