import TaskItem from "./taskitem";

import { useEffect, useState } from 'react';

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
        console.log('Error when fetching tasks: ' + err.message);
        return [];
    }
}

function TaskList() {
    const [tasksStatus, setTasksStatus] = useState(false);
    const [categoriesStatus, setCategoriesStatus] = useState(false);
    const [tasks, setTasks] = useState(new Map());
    const [categories, setCategories] = useState(new Map());

    useEffect(() => {
        getTasks().then(result => {
            let m = new Map();
            for (const item of result) {
                const {task_ID, ...val} = item;
                m.set(task_ID, val);
            }
            setTasks(m);
            setTasksStatus(true);
        });
    }, []);

    useEffect(() => {
        getCategories().then(result => {
            let m = new Map();
            for (const item of result) {
                const {category_ID, ...val} = item;
                m.set(category_ID, val);
            }
            setCategories(m);
            setCategoriesStatus(true);
        });
    }, []);

    if (!tasksStatus || !categoriesStatus) {
        return (
            <p>Loading task data...</p>
        );
    }
    
    let taskComponents = [];

    for (const [id, task] of tasks) {
        taskComponents.push(<TaskItem t={task} c={categories.get(task.category_ID)}/>)
    }

    return (
        <div>
            <div className='tasklist-container'>
                <h2>Tasks:</h2>
                <div>
                    <p>Create new:</p>
                    <button className='tasklist-menu-button'>Task</button>
                    <button className='tasklist-menu-button'>Category</button>
                </div>
                <div>
                    <p>Order by:</p>
                    <button className='tasklist-menu-button'>Due Date</button>
                    <button className='tasklist-menu-button'>Work Date</button>
                    <button className='tasklist-menu-button'>Category</button>
                    <button className='tasklist-menu-button'>Incomplete</button>
                </div>
            </div>
            {taskComponents}
        </div>
    );
}

export default TaskList;