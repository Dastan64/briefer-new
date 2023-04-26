import React from 'react';
import styles from './TaskCardsList.module.css';
import TaskCard from '../TaskCard/TaskCard';

const TaskCardsList = ({ tasks, subsectionId }) => {
    return (
        <div className={styles.list}>
            {tasks.map(task => <TaskCard variant={task.taskVariant} task={task} key={task.id}
                                         subsectionId={subsectionId}/>)}
        </div>
    );
};

export default TaskCardsList;
