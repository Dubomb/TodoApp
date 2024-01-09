async function getTasks() {
    try {
        const response = await fetch('http://localhost:3001/api/tasks');
    
        if (!response.ok) {
            return [];
        }
    
        const result = await response.json();
        return result.message;
        
    } catch (err) {
        console.log('Error when fetching tasks: ' + err.message);
        return [];
    }
}

async function getCategories() {
    try {
        const response = await fetch('http://localhost:3001/api/categories');
    
        if (!response.ok) {
            return [];
        }
    
        const result = await response.json();
        return result.message;
        
    } catch (err) {
        console.log('Error when fetching categories: ' + err.message);
        return [];
    }
}

async function getTasksWithCategory(categoryID) {
    try {
        const response = await fetch('http://localhost:3001/api/tasks/' + categoryID);
    
        if (!response.ok) {
            return [];
        }
    
        const result = await response.json();
        return result.message;
        
    } catch (err) {
        console.log('Error when fetching tasks: ' + err.message);
        return [];
    }
}

async function createCategory(category) {
    try {
        const response = await fetch('http://localhost:3001/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error creating category.' + err.message);
        return false;
    }
}

async function editCategory(category) {
    try {
        const response = await fetch('http://localhost:3001/api/categories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error editing category.' + err.message);
        return false;
    }
}

async function deleteCategory(category) {
    try {
        const response = await fetch('http://localhost:3001/api/categories', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error creating category.' + err.message);
        return false;
    }
}

async function createTask(task) {
    try {
        const response = await fetch('http://localhost:3001/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error creating task.' + err.message);
        return false;
    }
}

async function editTask(task) {
    try {
        const response = await fetch('http://localhost:3001/api/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error editing task.' + err.message);
        return false;
    }
}

async function deleteTask(task) {
    try {
        const response = await fetch('http://localhost:3001/api/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        const result = await response.json();

        return result.success;
    } catch (err) {
        console.log('Error deleting task.' + err.message);
        return false;
    }
}

module.exports = {
    getTasks,
    getCategories, 
    getTasksWithCategory,
    createCategory,
    editCategory,
    deleteCategory, 
    createTask,
    editTask,
    deleteTask
}