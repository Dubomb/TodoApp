import { useRef } from "react";

function EditCategoryModal({c, onSubmit, onCancel, onDelete}) {
    const selectRef = useRef();
    let defaultCategory = undefined;

    let categoryOptions = [];
    for (const [id, value] of c) {
        if (defaultCategory === undefined) {
            defaultCategory = id;
        }
        categoryOptions.push(<option value={id}>{value.name}</option>);
    }

    return (
        <div className='modal-container'>
            <dialog open className='modal-form'>
                <form method='dialog' onSubmit={(event) => onSubmit(event, selectRef.current.value)}>
                    <label htmlFor='category'>Name:</label><br></br>
                    <select id='category' name='category' ref={selectRef} defaultValue={defaultCategory}>
                        {categoryOptions}
                    </select><br></br>
                    <button type='submit' className='modal-button'>Edit</button>
                    <button onClick={(event) => {
                        event.preventDefault();
                        onDelete(selectRef.current.value);
                    }} className='modal-button'>Delete</button>
                    <button onClick={onCancel} className='modal-button'>Cancel</button>
                </form>
            </dialog>
        </div>
    );
}

export default EditCategoryModal;