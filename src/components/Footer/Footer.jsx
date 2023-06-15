import React, { useMemo } from 'react';
import styles from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    selectAllCheckedTasks,
    selectAllSubsections,
    selectTotalTimeOfAllTasks, setBriefId
} from '../../features/data/dataSlice';

//Utils
import { convertHoursToDays } from '../../utils/convertHoursToDays';
import { declinate } from '../../utils/declinate';
import { removeProperties } from '../../utils/removeProperties';

const Footer = ({ requiredFormData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allSubsections = useSelector(selectAllSubsections);
    const allTasks = useSelector(selectAllCheckedTasks);
    const totalHours = useSelector(selectTotalTimeOfAllTasks);

    const isValid = useMemo(() => {
        const requiredProperties = ['title', 'director', 'date_start', 'date_end', 'date_deadline', 'orderer', 'vendor', 'description'];
        return requiredProperties.every(prop => requiredFormData[prop]) && allSubsections.every(ss => ss.tasks.some(t => t.isChecked));
    }, [allSubsections, requiredFormData])

    const res = allTasks.map(task => removeProperties(task, ['isChecked', 'taskVariant', 'id']));

    const handleClick = () => {
        fetch('https://marketing-stage.technodom.kz/api/v2/technodom/brief/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
            },
            body: JSON.stringify({
                data: res,
                ...requiredFormData,
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json()
            }
        }).then(data => {
            console.log(data);
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
