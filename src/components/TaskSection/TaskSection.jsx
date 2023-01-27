import React, { useState } from 'react';
import './TaskSection.scss';
import TaskSubSection from '../TaskSubSection/TaskSubSection';
import { useDispatch } from 'react-redux';
import { checkNegativeTasksOnToggle } from '../../features/data/dataSlice';

const TaskSection = ({ section, parentIndex }) => {
    const dispatch = useDispatch();
    const [isToggled, setIsToggled] = useState(false);
    const { sectionTitle, subsections, id } = section;

    const handleClick = () => {
        setIsToggled(!isToggled);
        dispatch(checkNegativeTasksOnToggle(id))
    }

    return (
        <section className={`app__section section ${isToggled ? 'section--hidden' : ''}`}>
            <div className="section__container">
                <div className="section__info">
                    <h2 className="section__title" data-number={`${parentIndex + 1}.`}>{sectionTitle}</h2>
                    <p className="section__subtitle">Укажите все пункты, которые необходимы для выполнения задачи.</p>
                </div>
                {sectionTitle !== 'KV' &&
                    <button className={`section__toggle-btn ${isToggled ? 'section__toggle-btn--toggled' : ''}`}
                            onClick={handleClick}>{isToggled ? 'Нужно' : 'Не нужно'}
                    </button>}
            </div>
            {subsections.length > 0 && subsections.map((subsection, index) => <TaskSubSection
                subsection={subsection}
                parentIndex={parentIndex + 1}
                index={index}
                key={subsection.id}/>)}
        </section>
    );
};

export default TaskSection;
