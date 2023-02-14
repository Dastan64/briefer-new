import React from 'react';
import { useDispatch } from 'react-redux';
import './TaskCard.scss';

import { declinate } from '../../utils/declinate';
import { checkTask } from '../../features/data/dataSlice';

const TaskCard = ({ variant, task, subsectionId }) => {
    const dispatch = useDispatch();
    const { taskTitle, value, taskTimeToCreate, taskDescription, taskType, id, isChecked } = task;

    const handleChange = () => {
        dispatch(checkTask({
            id,
            subsectionId,
            type: taskType,
            value,
        }));
    }

    return (
        <label className={`card ${isChecked ? `card--${variant}` : ''}`}>
            <div className="card__container">
                <input type={taskType} className="card__input" checked={isChecked}
                       value={value} onChange={handleChange}/>
                <span className={`card__box`}></span>
                <div className="card__info">
                    <h3 className="card__title">{taskTitle}</h3>
                    {taskDescription && <p className="card__description">{taskDescription}</p>}
                    {taskTimeToCreate &&
                        <span className="card__time">
                            {taskTimeToCreate} {declinate(taskTimeToCreate, 'hours')}
                        </span>
                    }
                </div>
            </div>
        </label>
    );
};

export default TaskCard;
