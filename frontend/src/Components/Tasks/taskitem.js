function calculateDueTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    if (Math.abs(hours) < 24) {
        if (hours === 0) {
        return 'less than an hour';
        }
        return hours + ' hour' + (hours !== 1 ? 's' : '');
    } else {
        let days = Math.floor(hours / 24);
        return days + ' day' + (days !== 1 ? 's' : '');
    }
}

function TaskItem({t, c}) {
    if (c === undefined) {
        return <p>{t.category_ID}</p>;
    }

    const borderStyle = {
        '--accent-color': c.color
    };

    const timeDifference = new Date(t.due_date) - new Date()
    let due_time;
    if (timeDifference > 0) {
        due_time = <p>Due in {calculateDueTime(timeDifference)}</p>;
    } else {
        due_time = <p>Was due {calculateDueTime(-timeDifference)} ago</p>;
    }

    return (
        <div className='task-container' style={borderStyle}>
            <p><b>{t.title}</b> - {c.name}</p>
            {due_time}
            <br></br>
            <p>{t.description}</p>
            <br></br>
            <p>{t.status_ID ? 'Complete' : 'Incomplete'}</p>
        </div>
    );
}

export default TaskItem;
