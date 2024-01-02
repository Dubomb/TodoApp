import TaskItem from "./taskitem";

function TaskList() {
    return (
        <div>
            <div className='tasklist-container'>
                <h2>Tasks:</h2>
                <div>
                    <p>Order by:</p>
                    <button className='tasklist-order-button'>Due Date</button>
                    <button className='tasklist-order-button'>Work Date</button>
                    <button className='tasklist-order-button'>Category</button>
                    <button className='tasklist-order-button'>Incomplete</button>
                </div>
            </div>
            <TaskItem/>
            <TaskItem/>
        </div>

    );
}

export default TaskList;