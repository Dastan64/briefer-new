import React from 'react';
import './TaskCardsList.scss';
import TaskCard from '../TaskCard/TaskCard';

const TaskCardsList = ({ tasks, subsectionId }) => {
    return (
        <div className="cards-list">
            {tasks.map(task => <TaskCard variant={task.taskVariant} task={task} key={task.id}
                                         subsectionId={subsectionId}/>)}
        </div>
    );
};

export default TaskCardsList;
