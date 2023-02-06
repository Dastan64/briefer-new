import React from 'react';
import './TaskCard.scss';
import Radio from '../UI/Radio/Radio';
import Checkbox from '../UI/Checkbox/Checkbox';

import { declinate } from '../../utils/declinate';

const TaskCard = ({ variant, task, subsectionId }) => {
    const { taskTitle, taskTimeToCreate, taskDescription, taskType, id, isChecked } = task;
    return (
        <div className={`card ${isChecked ? `card--${variant}` : ''}`}>
            <div className="card__container">
                {taskType === 'radio' ?
                    <Radio variant={variant} value={taskTitle} id={id} isChecked={isChecked}
                           subsectionId={subsectionId}/>
                    : <Checkbox variant={variant} value={taskTitle} id={id} isChecked={isChecked}
                                subsectionId={subsectionId}/>
                }
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
        </div>
    );
};

export default TaskCard;
