function TaskItem({t, c}) {
    const rectStyle = {
        '--accent-color': c.color
    };

    return (
        <div className='task-container' style={rectStyle}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>Category: {c.name}</p>
        </div>
    );
}

export default TaskItem;
