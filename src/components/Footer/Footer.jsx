import React, { useMemo } from 'react';
import styles from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectAllCheckedTasks,
    selectAllSubsections,
    selectFormMandatoryTasks,
    selectTotalTimeOfAllTasks, setBriefId
} from '../../features/data/dataSlice';

//Utils
import { convertHoursToDays } from '../../utils/convertHoursToDays';
import { declinate } from '../../utils/declinate';
import { deleteKeys } from '../../utils/deleteKeys';

const Footer = () => {
    const navigate = useNavigate();
    const formTasks = useSelector(selectFormMandatoryTasks);
    const allSubsections = useSelector(selectAllSubsections);
    const allTasks = useSelector(selectAllCheckedTasks);
    const totalHours = useSelector(selectTotalTimeOfAllTasks);
    const dispatch = useDispatch();

    const isValid = useMemo(() => {
        return formTasks?.every(task => task.isChecked) && allSubsections.every(ss => ss.tasks.some(t => t.isChecked));
    }, [formTasks, allSubsections])

    const res = allTasks.map(task => deleteKeys(task))

    const handleClick = () => {
        fetch('https://marketing.technodom.kz/api/v1/promo_brief_constructor/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
            },
            body: JSON.stringify({
                data: res,
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json()
            }
        }).then(data => {
            if (data.brief_id) {
                dispatch(setBriefId(data.brief_id));
                navigate('/success');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <footer className={styles.footer}>
            <div>
                <p className={styles.caption}>Общее время разработки:
                    <span> {totalHours > 24 ? convertHoursToDays(totalHours) : `${totalHours} ${declinate(totalHours, 'hours')}`}</span>
                </p>
                <p className={styles.warning}>{!isValid && 'Не все поля заполнены'}</p>
            </div>
            <button
                className={styles.button}
                disabled={!isValid}
                onClick={handleClick}
                type="button">
                Отправить бриф
            </button>
        </footer>
    );
};

export default Footer;
