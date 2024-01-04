function TaskModal({t, onSubmit, onCancel}) {
    let currentTitle = '';
    let currentDescription = '';
    let currentDueDate = undefined;

    if (t !== undefined) {
        currentTitle = t.name;
        currentDescription = t.color;
        currentDueDate = t.due_date;
    }
    
    return (
        <div className='modal-container'>
            <dialog open className='modal-form'>
                <form method='dialog' onSubmit={onSubmit.bind(this)}>
                    <label htmlFor='title'>Title:</label><br></br>
                    <input type='text' id='title' name='title' defaultValue={currentTitle}></input><br></br>
                    <label>Description:</label><br></br>
                    <textarea defaultValue={currentDescription} rows={6} cols={60}></textarea><br></br>
                    <label htmlFor='duedate'>Due Date:</label><br></br>
                    <input type='datetime-local' id='duedate' name='duedate'></input><br></br>
                    <button type='submit' className='modal-button'>Save</button>
                    <button onClick={onCancel} className='modal-button'>Cancel</button>
                </form>
            </dialog>
        </div>
    );
}

export default TaskModal;