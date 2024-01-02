module.exports = function(expressApp) {

    const connection = expressApp.get('connection');

    expressApp.get('/api/tasks', (req, res) => {
        const connection = expressApp.get('connection');
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
        const query = 'insert into task (task_ID, title, description, due_date, status_ID, category_ID) values (?, ?, ?, ?, ?, ?)';
        const data = req.body;
        const params = [data.task_ID, data.title, data.description, data.due_date, data.status_ID, data.category_ID];
        
        const connection = expressApp.get('connection');
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
        const query = 'update task set title = ?, description = ?, due_date = ?, status_ID = ?, category_ID = ? where task_ID = ?';
        const data = req.body;
        const params = [data.title, data.description, data.due_date, data.status_ID, data.category_ID, data.task_ID];
    
        const connection = expressApp.get('connection');
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
    
        const connection = expressApp.get('connection');
        connection.query(query, params, (err) => {
            if (err) {
                console.log('Error: ' + err.message);
                res.status(500).json({success: false, message: 'Failed to delete data from database.'});
                return;
            }
    
            res.json({success: true, message: 'Successfully deleted data from database.'});
        });
    });

}
