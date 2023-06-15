import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TaskCard.module.css';

import { declinate } from '../../utils/declinate';
import { checkTask } from '../../features/data/dataSlice';

const TaskCard = ({ variant, task, subsectionId }) => {
    const dispatch = useDispatch();
    const { taskTitle, taskTimeToCreate, taskDescription, taskType, id, isChecked, isDisabled } = task;

    const handleChange = () => {
        dispatch(checkTask({
            id,
            subsectionId,
            type: taskType,
            value: taskTitle,
        }));
    }

    return (
        <label
            className={`${styles.card} ${variant ? styles[`card_type_${variant}`] : ''} ${isChecked ? styles[`card_type_${variant}_checked`] : ''} ${isDisabled ? styles.disabled : ''} ${taskTitle.toLowerCase() === 'не требуется' ? styles.cardTypeNegativeDisabled : ''}`}>
            <div className={styles.container}>
                <input type={taskType} className={styles.input} checked={!isDisabled ? isChecked : true}
                       value={taskTitle} onChange={handleChange} disabled={isDisabled}/>
                <span className={`${styles.box} ${isDisabled ? styles.boxDisabled : ''}`}></span>
                <div>
                    <h3 className={styles.title}>{taskTitle}</h3>
                    {taskDescription && <p className={styles.description}>{taskDescription}</p>}
                    {taskTimeToCreate &&
                        <span className={styles.time}>
                            {taskTimeToCreate} {declinate(taskTimeToCreate, 'hours')}
                        </span>
                    }
                </div>
            </div>
        </label>
    );
};

export default TaskCard;
