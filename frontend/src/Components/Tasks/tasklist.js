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

function TaskList() {
    const [tasksReady, setTasksReady] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(result => {
            setTasks(result);
            setTasksReady(true);
        });
    }, []);
    
    let taskComponents = [];

    for (const task of tasks) {
        taskComponents.push(<TaskItem t={task}/>)
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