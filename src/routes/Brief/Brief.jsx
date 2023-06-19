import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './Brief.module.css';

import { fetchBriefTasks, selectBriefTasks } from '../../features/brief/briefSlice';

//Utils
import { declinate } from '../../utils/declinate';
import { convertHoursToDays } from '../../utils/convertHoursToDays';

//Components
import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import BriefDataTable from '../../components/BriefDataTable/BriefDataTable';

const Brief = () => {
        const { id } = useParams();
        const dispatch = useDispatch();
        const tasks = useSelector(selectBriefTasks);
        const totalTime = useSelector(state => state.brief.timeToCreate);
        const totalTimeFormatted = totalTime > 24 ? convertHoursToDays(totalTime) : `${totalTime} ${declinate(totalTime, 'hours')}`
        const requiredFormData = useSelector(state => state.brief.data);

        useEffect(() => {
            dispatch(fetchBriefTasks(id))
        }, [id, dispatch])

        return (
            <main className={styles.result}>
                <p className={styles.time}>Общее время разработки:
                    <span
                        className={styles.timeBolder}> {totalTimeFormatted}</span>
                </p>
                <div className={styles.fields}>
                    <Input label={'Название акции'} value={requiredFormData?.title || ''} isDisabled/>
                    <Input label={'Постановщик задачи'} value={requiredFormData?.director || ''} isDisabled/>
                    <Input label={'Заказчик'} value={requiredFormData?.orderer || ''} isDisabled/>
                    <Input label={'Дедлайн'}
                           value={new Date(requiredFormData?.date_deadline).toLocaleDateString() || ''} isDisabled/>
                    <Input label={'Бренд'} value={requiredFormData?.vendor || ''} isDisabled/>
                    <Textarea label={'Описание'} value={requiredFormData?.description || ''} isDisabled/>
                </div>
                <BriefDataTable tasks={tasks} totalTime={totalTimeFormatted}/>
            </main>
        );
    }
;

export default Brief;
