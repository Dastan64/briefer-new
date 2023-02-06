import React, { useMemo } from 'react';
import './Footer.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearAllTasks,
    selectAllCheckedTasks,
    selectAllSubsections,
    selectFormMandatoryTasks,
    selectTotalTimeOfAllTasks
} from '../../features/data/dataSlice';
import { convertHoursToDays } from '../../utils/convertHoursToDays';
import { declinate } from '../../utils/declinate';
import { deleteKeys } from '../../utils/deleteKeys';

const Footer = () => {
    const formTasks = useSelector(selectFormMandatoryTasks);
    const allSubsections = useSelector(selectAllSubsections);
    const allTasks = useSelector(selectAllCheckedTasks);
    const totalHours = useSelector(selectTotalTimeOfAllTasks);
    const dispatch = useDispatch();

    const isValid = useMemo(() => {
        return formTasks?.every(task => task.isChecked) && allSubsections?.every(ss => ss.isMarked);
    }, [formTasks, allSubsections])

    const res = allTasks.map(task => {
        return deleteKeys(task);
    })

    const handleClick = () => {
        fetch('https://marketing-stage.technodom.kz/api/v1/promo_brief_constructor/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
            },
            body: JSON.stringify({
                data: res,
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
            dispatch(clearAllTasks())
        })
    }

    return (
        <footer className="footer">
            <div className="footer__info">
                <p className="footer__info-caption">Общее время
                    разработки: <span>{totalHours > 24 ? convertHoursToDays(totalHours) : `${totalHours} ${declinate(totalHours, 'hours')}`}</span>
                </p>
                <p className="footer__warning">{!isValid && 'Не все поля заполнены'}</p>
            </div>
            <button
                className="footer__btn"
                disabled={!isValid}
                onClick={handleClick}
                type="button">Отправить бриф
            </button>
        </footer>
    );
};

export default Footer;
