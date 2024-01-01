const mysql = require('mysql2');

const fs = require('node:fs');

const express = require('express');
const expressApp = express();
const port = 3001;

const cors = require('cors');

expressApp.use(cors());
expressApp.use(express.json());

expressApp.get('/status', (req, res) => {
    res.json({message: 'The server is ready.'});
});

expressApp.get('/api/gettasks', (req, res) => {
    connection.query('select * from task', (err, results) => {
        if (err) { 
            res.status(500).json({success: false, message: 'Failed to retrieve database information.'});
            console.log('Failed to retrieve database information.');
            return;
        }
        
        res.json({success: true, message: results});
    });
});

expressApp.get('/test', (req, res) => {
    let r = 'what';

    connection.query('select name from status', (err, results) => {
        if (err) {
            res.status(500).json({success: false, message: 'Database failed to fetch information'});
            return;
        }

        res.json({message: results});
    });
});

expressApp.post('/number', (req, res) => {
    const query = 'insert into test (a) values (?)';
    connection.query(query, [req.body.a], (err, results) => {
        if (err) {
            res.json({message: 'Error: ' + err.message});
            return;
        }

        res.json({message: 'Successfully inserted data into database'});
    })
});

expressApp.listen(port, () => {
    console.log('Server running on ' + port);
});

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
