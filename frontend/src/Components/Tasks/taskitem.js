function TaskItem({t, c}) {
    return (
        <div>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>Due: {t.due_date}</p>
            <p>Category: {c.name}</p>
        </div>
    );
}

export default TaskItem;