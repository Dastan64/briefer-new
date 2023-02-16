import React, { useState } from 'react';
import './TaskSection.scss';
import TaskSubSection from '../TaskSubSection/TaskSubSection';
import { useDispatch } from 'react-redux';
import { checkNegativeTasksOnToggle } from '../../features/data/dataSlice';

const TaskSection = ({ section, parentIndex }) => {
    const dispatch = useDispatch();
    const [isToggled, setIsToggled] = useState(false);
    const { sectionTitle, subsections, id, isDisabled, required } = section;

    const handleClick = () => {
        setIsToggled(!isToggled);
        dispatch(checkNegativeTasksOnToggle(id))
    }

    return (
        <section className={`app__section section ${isToggled ? 'section--hidden' : ''}`}>
            <div className={`section__container ${!required ? 'section__container--beside' : ''}`}>
                <div className="section__info">
                    <h2 className="section__title" data-number={`${parentIndex + 1}.`}>{sectionTitle}</h2>
                    {!isDisabled ?
                        <p className="section__subtitle">Укажите все пункты, которые необходимы для выполнения
                            задачи.</p>
                        :
                        <p className="section__subtitle">Здесь указаны все выбранные пункты</p>}
                </div>
                {(sectionTitle !== 'KV' && !isDisabled) &&
                    <button className={`section__toggle-btn ${isToggled ? 'section__toggle-btn--toggled' : ''}`}
                            onClick={handleClick}>{isToggled ? 'Нужно' : 'Не нужно'}
                    </button>}
                {(isDisabled && !required) && (
                    <label className="card card_disabled card_type_negative_disabled">
                        <div className="card__container">
                            <input type="radio" className="card__input" disabled value="Не требуется" checked/>
                            <span className="card__box"></span>
                            <div className="card__info">
                                <h3 className="card__title">Не требуется</h3>
                            </div>
                        </div>
                    </label>
                )}
            </div>
            {subsections.length > 0 && required && subsections.map((subsection, index) => <TaskSubSection
                subsection={subsection}
                parentIndex={parentIndex + 1}
                index={index}
                key={subsection.id}/>)}
        </section>
    );
};

export default TaskSection;
