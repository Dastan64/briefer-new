import React from 'react';
import { useDispatch } from 'react-redux';
import './TaskCard.scss';

import { declinate } from '../../utils/declinate';
import { checkTask } from '../../features/data/dataSlice';

const TaskCard = ({ variant, task, subsectionId }) => {
    const dispatch = useDispatch();
    const { taskTitle, value, taskTimeToCreate, taskDescription, taskType, id, isChecked, isDisabled } = task;
    const handleChange = () => {
        dispatch(checkTask({
            id,
            subsectionId,
            type: taskType,
            value,
        }));
    }

    return (
        <label
            className={`card ${variant ? `card_type_${variant}` : ''} ${isChecked ? `card_type_${variant}_checked` : ''} ${isDisabled ? `card_disabled` : ''} ${value.toLowerCase() === 'не требуется' ? 'card_type_negative_disabled' : ''}`}>
            <div className="card__container">
                <input type={taskType} className="card__input" checked={!isDisabled ? isChecked : true}
                       value={value} onChange={handleChange} disabled={isDisabled}/>
                <span className={`card__box ${isDisabled ? 'card__box--disabled' : ''}`}></span>
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
