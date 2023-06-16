import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './Brief.module.css';

import { fetchBriefTasks } from '../../features/brief/briefSlice';

//Utils
import { declinate } from '../../utils/declinate';
import { convertHoursToDays } from '../../utils/convertHoursToDays';

//Components
import Input from '../../components/UI/Input/Input';
import TaskSection from '../../components/TaskSection/TaskSection';
import FileInfoInput from '../../components/FileInfoInput/FileInfoInput';

const Brief = () => {
        const { id } = useParams();
        const tasks = useSelector(state => state.brief.tasks);
        const sections = useSelector(state => state.brief.sections);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchBriefTasks(id))
        }, [id, dispatch])

        const totalHours = useMemo(() => tasks.reduce((acc, current) => acc + Number(current.taskTimeToCreate.toString().replace(/,/g, '.')) || 0, 0), [tasks]);

        return (
            <main className={styles.result}>
                <p className={styles.time}>Общее время разработки:
                    <span
                        className={styles.timeBolder}> {totalHours > 24 ? convertHoursToDays(totalHours) : `${totalHours} ${declinate(totalHours, 'hours')}`}</span>
                </p>
                {/*<div className={styles.fields}>*/}
                {/*    {tasks.filter(task => task.taskType !== 'radio' && task.taskType !== 'checkbox').map(task => {*/}
                {/*        if (task.taskType === 'file') {*/}
                {/*            return <FileInfoInput task={task} key={uuidv4()}/>*/}
                {/*        }*/}
                {/*        return <Input name={task.taskTitle} label={task.taskTitle}*/}
                {/*                      value={task.value}*/}
                {/*                      key={uuidv4()} id={task.id} isDisabled={true}/>*/}

                {/*    })}*/}
                {/*</div>*/}
                <div className={styles.options}>
                    {sections?.length > 0 && sections.slice(1).map((section, index) =>
                        <TaskSection
                            section={section}
                            parentIndex={index}
                            key={section.id}/>)}
                </div>
            </main>
        );
    }
;

export default Brief;
