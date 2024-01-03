module.exports = function(expressApp) {

    expressApp.get('/api/categories', (req, res) => {
        const connection = expressApp.get('connection');
        connection.query('select * from category', (err, results) => {
            if (err) { 
                console.log('Error: ' + err.message);
                res.status(500).json({success: false, message: 'Failed to retrieve database information.'});
                return;
            }
            
            res.json({success: true, message: results});
        });
    });

    expressApp.post('/api/categories', (req, res) => {
        const query = 'insert into category (category_ID, name, color) values (?, ?, ?)';
        const data = req.body;
        const params = [data.category_ID, data.name];
        
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

    expressApp.put('/api/categories', (req, res) => {
        const query = 'update category set name = ?, color = ? where category_ID = ?';
        const data = req.body;
        const params = [data.name, data.category_ID];

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

    expressApp.delete('/api/categories', (req, res) => {
        const query = 'delete from task where category_ID = ?';
        const data = req.body;
        const params = [data.category_ID];

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

