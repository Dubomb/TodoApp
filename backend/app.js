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

expressApp.get('/api/tasks', (req, res) => {
    connection.query('select * from task', (err, results) => {
        if (err) { 
            console.log('Error: ' + err.message);
            res.status(500).json({success: false, message: 'Failed to retrieve database information.'});
            return;
        }
        
        res.json({success: true, message: results});
    });
});

expressApp.post('/api/tasks', (req, res) => {
    const query = 'insert into task (task_ID, title, description, due_date, status_ID) values (?, ?, ?, ?, ?)';
    const data = req.body;
    const params = [data.task_ID, data.title, data.description, data.due_date, data.status_ID];
    
    connection.query(query, params, (err) => {
        if (err) {
            console.log('Error: ' + err.message);
            res.status(500).json({success: false, message: 'Failed to insert data into database.'});
            return;
        }

        res.json({success: true, message: 'Successfully inserted data into database.'});
    });
});

expressApp.put('/api/tasks', (req, res) => {
    const query = 'update task set title = ?, description = ?, due_date = ?, status_ID = ? where task_ID = ?';
    const data = req.body;
    const params = [data.title, data.description, data.due_date, data.status_ID, data.task_ID];

    connection.query(query, params, (err) => {
        if (err) {
            console.log('Error: ' + err.message);
            res.status(500).json({success: false, message: 'Failed to update data in database.'});
            return;
        }

        res.json({success: true, message: 'Successfully updated data in database.'});
    });
});

expressApp.delete('/api/tasks', (req, res) => {
    const query = 'delete from task where task_ID = ?';
    const data = req.body;
    const params = [data.task_ID];

    connection.query(query, params, (err) => {
        if (err) {
            console.log('Error: ' + err.message);
            res.status(500).json({success: false, message: 'Failed to delete data from database.'});
            return;
        }

        res.json({success: true, message: 'Successfully deleted data from database.'});
    });
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
