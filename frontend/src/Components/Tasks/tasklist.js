import { useEffect, useState } from 'react';

import TaskItem from "./taskitem";
import CategoryModal from './categorymodal';
import EditCategoryModal from './editcategorymodal'
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

function compareDueDate(a, b) {
    return new Date(a.due_date) - new Date(b.due_date);
}

function compareCategory(a, b) {
    return a.category_ID - b.category_ID;
}

function compareComplete(a, b) {
    return a.complete - b.complete;
}

function TaskList() {
    const [tasksStatus, setTasksStatus] = useState(false);
    const [categoriesStatus, setCategoriesStatus] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState(new Map());
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    let selectedCategory = undefined;
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

    const onEditCategorySubmit = (async (event) => {
        const categoryID = selectedCategory;
        const categoryName = event.target[0].value;
        const categoryColor = event.target[1].value;
        const newCategory = {category_ID: categoryID, name: categoryName, color: categoryColor};
        const success = await editCategory(newCategory);

        if (success) {
            let updated = categories;
            const {category_ID, ...values} = newCategory;
            updated.set(category_ID, values);
            setCategories(updated);
        }

        setCategoryModalOpen(false);
    });

    const onCategoryModalCancel = (() => {
        setCategoryModalOpen(false);
    });

    const openCategoryModal = ((c) => {
        setCategoryModalOpen(true);
        setCurrentModal(<CategoryModal c={c} onSubmit={c === undefined ? onCreateCategorySubmit : onEditCategorySubmit} onCancel={onCategoryModalCancel}/>);
    });

    const onCreateTaskSubmit = (async (event) => {
        const taskID = Math.floor(Math.random() * 2**31);
        const taskTitle = event.target[0].value;
        const taskDescription = event.target[1].value;
        const taskDueDate = event.target[2].value;
        const taskCategory = parseInt(event.target[3].value);
        const task = {task_ID: taskID, title: taskTitle, description: taskDescription, due_date: taskDueDate, complete: 0, category_ID: taskCategory};
        
        const success = await createTask(task);

        if (success) {
            const updated = [task, ...tasks];
            setTasks(updated);
        }

        setTaskModalOpen(false);
    });

    const onEditTaskSubmit = (async (event, t) => {
        const taskTitle = event.target[0].value;
        const taskDescription = event.target[1].value;
        const taskDueDate = event.target[2].value;
        const taskCategory = parseInt(event.target[3].value);

        const newTask = {...t, title: taskTitle, description: taskDescription, due_date: taskDueDate, category_ID: taskCategory};

        const success = await editTask(newTask);

        if (success) {
            const updated = tasks.map((task) => 
                task.task_ID === newTask.task_ID ? newTask : task
            );
    
            setTasks(updated);
        }

        setTaskModalOpen(false);
    });

    const onTaskModalCancel = (() => {
        setTaskModalOpen(false);
    });

    const onCompleteTask = (async (task) => {
        const completedTask = {...task, due_date: new Date(task.due_date).toISOString().slice(0, -5), complete: true};

        const success = await editTask(completedTask);

        if (success) {
            const updated = tasks.map((item) => 
                item.task_ID === task.task_ID ? {...task, complete: true} : item 
            );

            setTasks(updated);
        }
    });

    const onEditTask = (async (task) => {
        openTaskModal(task);
    });

    const onDeleteTask = (async (task) => {
        const success = await deleteTask(task);

        if (success) {
            const [task, ...updated] = tasks;
            setTasks(updated);
        }
    });

    const openTaskModal = ((t) => {
        setTaskModalOpen(true);
        setCurrentModal(<TaskModal t={t} c={categories} onSubmit={t === undefined ? onCreateTaskSubmit : onEditTaskSubmit} onCancel={onTaskModalCancel}/>);
    });

    const onEditCategory = ((event, id) => {
        selectedCategory = parseInt(id, 10);
        openCategoryModal(categories.get(selectedCategory));
    });

    const onDeleteCategory = (async (id) => {
        const categoryID = parseInt(id);
        const categoryData = categories.get(categoryID);
        const category = {category_ID: categoryID, name: categoryData.name, color: categoryData.color};
        const success = await deleteCategory(category);

        if (success) {
            let updated = categories;
            categories.delete(categoryID);
            setCategories(updated);
        }

        setCategoryModalOpen(false);
    });

    const openEditCategoryModal = (() => {
        setCategoryModalOpen(true);
        setCurrentModal(<EditCategoryModal c={categories} onSubmit={(event, id) => onEditCategory(event, id)} onCancel={onCategoryModalCancel} onDelete={(id) => onDeleteCategory(id)}/>)
    });

    if (!tasksStatus || !categoriesStatus) {
        return (
            <p>Loading task data...</p>
        );
    }

    let taskComponents = [];

    if (tasks.length !== 0) {
        for (const task of tasks) {
            taskComponents.push(<TaskItem t={task} c={categories.get(task.category_ID)} onComplete={onCompleteTask} onDelete={onDeleteTask} onEdit={onEditTask}/>)
        }
    }

    return (
        <div>
            {(categoryModalOpen || taskModalOpen) && currentModal}
            <div className='tasklist-menu-container'>
                <div>
                    <p>Create new:</p>
                    <button onClick={() => openTaskModal(undefined)} className='tasklist-menu-button' disabled={categories.size === 0}>Task</button>
                    <button onClick={() => openCategoryModal(undefined)} className='tasklist-menu-button'>Category</button>
                </div>
                <div>
                    <p>Edit:</p>
                    <button onClick={openEditCategoryModal} className='tasklist-menu-button' disabled={categories.size === 0}>Category</button>
                </div>
                <div>
                    <p>Order by:</p>
                    <button className='tasklist-menu-button' disabled={tasks.length === 0} onClick={() => {
                        const sorted = [...tasks].sort(compareDueDate);
                        setTasks(sorted);
                    }}>Due Date</button>
                    <button className='tasklist-menu-button' disabled={tasks.length === 0} onClick={() => {
                        const sorted = [...tasks].sort(compareCategory);
                        setTasks(sorted);
                    }}>Category</button>
                    <button className='tasklist-menu-button' disabled={tasks.length === 0} onClick={() => {
                        const sorted = [...tasks].sort(compareComplete);
                        console.log(sorted);
                        setTasks(sorted);
                    }}>Incomplete</button>
                </div>
            </div>
            {tasks.length === 0 ? 
            <div className='empty-tasklist-container'>
                <p>Create a new task to get started.</p>
            </div> : 
            <div className='tasklist-items-container'>
                {taskComponents}
            </div>}

        </div>
    );
}

export default TaskList;