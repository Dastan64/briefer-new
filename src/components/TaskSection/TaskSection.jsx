import React, { useState } from 'react';
import styles from './TaskSection.module.css';

import TaskSubSection from '../TaskSubSection/TaskSubSection';
import { useDispatch } from 'react-redux';
import { checkNegativeTasksOnToggle } from '../../features/data/dataSlice';
import TaskCard from '../TaskCard/TaskCard';

const TaskSection = ({ section, parentIndex }) => {
    const dispatch = useDispatch();
    const [isToggled, setIsToggled] = useState(false);
    const { sectionTitle, subsections, id, isDisabled, required } = section;

    const handleClick = () => {
        setIsToggled(!isToggled);
        dispatch(checkNegativeTasksOnToggle(id))
    }

    return (
        <section className={`${styles.section} ${isToggled ? styles.hidden : ''}`}>
            <div className={`${styles.container} ${!required ? styles.cContainerBeside : ''}`}>
                <div>
                    <h2 className={styles.title} data-number={`${parentIndex + 1}.`}>{sectionTitle}</h2>
                    {!isDisabled ?
                        <p className={styles.subtitle}>Укажите все пункты, которые необходимы для выполнения
                            задачи.</p>
                        :
                        <p className={styles.subtitle}>Здесь указаны все выбранные пункты</p>}
                </div>
                {(sectionTitle !== 'KV' && !isDisabled) &&
                    <button className={`${styles.toggleBtn} ${isToggled ? styles.toggleBtnToggled : ''}`}
                            onClick={handleClick}>{isToggled ? 'Нужно' : 'Не нужно'}
                    </button>}
                {(isDisabled && !required) && (
                    <TaskCard task={{
                        taskTitle: 'Не требуется',
                        taskType: 'radio',
                        value: 'не требуется',
                        isDisabled: true,
                    }}/>
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
