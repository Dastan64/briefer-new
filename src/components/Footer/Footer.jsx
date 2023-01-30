import React, { useMemo } from 'react';
import './Footer.scss';
import { useSelector } from 'react-redux';
import {
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

    const isValid = useMemo(() => {
        return formTasks?.every(task => task.isChecked) && allSubsections?.every(ss => ss.isMarked);
    }, [formTasks, allSubsections])

    const res = allTasks.map(task => {
        return deleteKeys(task);
    })
    //Тут будет отправка данных на эндпоинт


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
                type="button">Отправить бриф
            </button>
        </footer>
    );
};

export default Footer;
