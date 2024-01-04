function TaskModal({t, c, onSubmit, onCancel}) {
    let currentTitle = '';
    let currentDescription = '';
    let currentDueDate = undefined;
    let currentCategory = undefined;

    if (t !== undefined) {
        currentTitle = t.name;
        currentDescription = t.color;
        currentDueDate = t.due_date;
        currentCategory = t.category_ID;
    }

    let categoryOptions = [];

    for (const [id, value] of c) {
        categoryOptions.push(<option value={id}>{value.name}</option>);
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
                    <label htmlFor='category'>Category:</label><br></br>
                    <select id='category' name='category' defaultValue={currentCategory}>
                        {categoryOptions}
                    </select><br></br>
                    <button type='submit' className='modal-button'>Save</button>
                    <button onClick={onCancel} className='modal-button'>Cancel</button>
                </form>
            </dialog>
        </div>
    );
}

export default TaskModal;