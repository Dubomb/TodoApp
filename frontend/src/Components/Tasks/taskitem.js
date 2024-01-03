function TaskItem({t}) {
    return (
        <div>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>Due: {t.due_date}</p>
        </div>
    );
}

export default TaskItem;