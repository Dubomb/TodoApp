function TaskModal({t, c, onSubmit, onCancel}) {
    let currentTitle = '';
    let currentDescription = '';
    let currentDueDate = undefined;
    let currentCategory = undefined;

    if (t !== undefined) {
        currentTitle = t.title;
        currentDescription = t.description;
        currentDueDate = new Date(t.due_date).toISOString().slice(0, -5);
        currentCategory = t.category_ID;
    }

    let categoryOptions = [];

    for (const [id, value] of c) {
        categoryOptions.push(<option value={id}>{value.name}</option>);
    }
    
    return (
        <div className='modal-container'>
            <dialog open className='modal-form'>
                <form method='dialog' onSubmit={(event) => onSubmit(event, t)}>
                    <label htmlFor='title'>Title: <span className='req-star'>*</span></label><br></br>
                    <input type='text' id='title' name='title' defaultValue={currentTitle} required={true}></input><br></br>
                    <label>Description:</label><br></br>
                    <textarea defaultValue={currentDescription} rows={6} cols={60}></textarea><br></br>
                    <label htmlFor='duedate'>Due Date: <span className='req-star'>*</span></label><br></br>
                    <input type='datetime-local' id='duedate' name='duedate' defaultValue={currentDueDate} required={true}></input><br></br>
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