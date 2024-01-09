function CategoryModal({c, onSubmit, onCancel}) {
    let currentName = '';
    let currentColor = '#000000';

    if (c !== undefined) {
        currentName = c.name;
        currentColor = c.color;
    }
    
    return (
        <div className='modal-container'>
            <dialog open className='modal-form'>
                <form method='dialog' onSubmit={onSubmit}>
                    <label htmlFor='name'>Name:</label><br></br>
                    <input type='text' id='name' name='name' defaultValue={currentName}></input><br></br>
                    <label>Color:</label><br></br>
                    <input type='color' id='name' name='name' defaultValue={currentColor}></input><br></br>
                    <button type='submit' className='modal-button'>Save</button>
                    <button onClick={onCancel} className='modal-button'>Cancel</button>
                </form>
            </dialog>
        </div>
    );
}

export default CategoryModal;