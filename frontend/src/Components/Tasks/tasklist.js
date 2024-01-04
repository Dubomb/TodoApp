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

function compareDueDate(a, b) {
    return new Date(b.due_date) - new Date(a.due_date);
}

function compareCategory(a, b) {
    return a.category_ID - b.category_ID;
}

function compareComplete(a, b) {
    return a.status_ID - b.status_ID;
}

function TaskList() {
    const [tasksStatus, setTasksStatus] = useState(false);
    const [categoriesStatus, setCategoriesStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState(new Map());

    useEffect(() => {
        getTasks().then(result => {
            setTasks(result);
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

    for (const task of tasks) {
        console.log(task.task_ID);
        taskComponents.push(<TaskItem t={task} c={categories.get(task.category_ID)}/>)
    }

    console.log(taskComponents);

    return (
        <div>
            <div className='tasklist-menu-container'>
                <h2>Tasks:</h2>
                <div>
                    <p>Create new:</p>
                    <button className='tasklist-menu-button'>Task</button>
                    <button className='tasklist-menu-button'>Category</button>
                </div>
                <div>
                    <p>Order by:</p>
                    <button className='tasklist-menu-button' onClick={() => {
                        const sorted = [...tasks].sort(compareDueDate);
                        setTasks(sorted);
                    }}>Due Date</button>
                    <button className='tasklist-menu-button'>Work Date</button>
                    <button className='tasklist-menu-button' onClick={() => {
                        const sorted = [...tasks].sort(compareCategory);
                        setTasks(sorted);
                    }}>Category</button>
                    <button className='tasklist-menu-button' onClick={() => {
                        const sorted = [...tasks].sort(compareComplete);
                        setTasks(sorted);
                    }}>Incomplete</button>
                </div>
            </div>
            <div className='tasklist-items-container'>
                {taskComponents}
            </div>
        </div>
    );
}

export default TaskList;