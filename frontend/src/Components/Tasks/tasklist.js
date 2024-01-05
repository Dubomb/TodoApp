import { useEffect, useState } from 'react';

import TaskItem from "./taskitem";
import CategoryModal from './categorymodal';
import TaskModal from './taskmodal';

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
        console.log('Error creating category.' + err.message);
        return false;
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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState();

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

    const onCreateCategorySubmit = (async (event) => {
        const categoryID = Math.floor(Math.random() * 2**31);
        const categoryName = event.target[0].value;
        const categoryColor = event.target[1].value;
        const category = {category_ID: categoryID, name: categoryName, color: categoryColor};
        const success = await createCategory(category);

        if (success) {
            const updated = categories;
            const {category_ID, ...values} = category;
            updated.set(category_ID, values);
            setCategories(updated);
        }

        setCategoryModalOpen(false);
    });

    const onCreateCategoryCancel = (() => {
        setCategoryModalOpen(false);
    });

    const openCategoryModal = ((c) => {
        setCategoryModalOpen(true);
        setCurrentModal(<CategoryModal c={c} onSubmit={onCreateCategorySubmit} onCancel={onCreateCategoryCancel}/>);
    });

    const onCreateTaskSubmit = (async (event) => {
        const taskID = Math.floor(Math.random() * 2**31);
        const taskTitle = event.target[0].value;
        const taskDescription = event.target[1].value;
        const taskDueDate = event.target[2].value;
        const taskCategory = parseInt(event.target[3].value);
        const task = {task_ID: taskID, title: taskTitle, description: taskDescription, due_date: taskDueDate, status_ID: 0, category_ID: taskCategory};
        
        const success = await createTask(task);

        if (success) {
            const updated = [task, ...tasks];
            setTasks(updated);
        }

        setTaskModalOpen(false);
    });

    const onCreateTaskCancel = (() => {
        setTaskModalOpen(false);
    });

    const openTaskModal = ((t) => {
        setTaskModalOpen(true);
        setCurrentModal(<TaskModal t={t} c={categories} onSubmit={onCreateTaskSubmit} onCancel={onCreateTaskCancel}/>);
    });

    if (!tasksStatus || !categoriesStatus) {
        return (
            <p>Loading task data...</p>
        );
    }

    let taskComponents = [];

    for (const task of tasks) {
        taskComponents.push(<TaskItem t={task} c={categories.get(task.category_ID)}/>)
    }

    return (
        <div>
            {(categoryModalOpen || taskModalOpen) && currentModal}
            <div className='tasklist-menu-container'>
                <h2>Tasks:</h2>
                <div>
                    <p>Create new:</p>
                    <button onClick={() => openTaskModal(undefined)} className='tasklist-menu-button'>Task</button>
                    <button onClick={() => openCategoryModal(undefined)} className='tasklist-menu-button'>Category</button>
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