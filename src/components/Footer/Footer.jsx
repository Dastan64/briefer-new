import React, { useState } from 'react';
import './Footer.scss';
import { useSelector } from 'react-redux';
import {
    selectAllSubsections,
    selectFormMandatoryTasks,
    selectTotalTimeOfAllTasks
} from '../../features/data/dataSlice';
import { convertHoursToDays } from '../../utils/convertHoursToDays';
import { declinate } from '../../utils/declinate';

const Footer = () => {
    const [isValid, setIsValid] = useState(false);
    const data = useSelector(state => state.data.modifiedData.sections);
    const formTasks = useSelector(selectFormMandatoryTasks);
    const allSubsections = useSelector(selectAllSubsections);
    const totalHours = useSelector(selectTotalTimeOfAllTasks);

    if (formTasks && formTasks.length > 0 && allSubsections && allSubsections.length > 0) {
        const isValid = formTasks.every(task => task.isChecked) && allSubsections.every(ss => ss.isMarked);
        console.log(isValid)
    }

    return (
        <footer className="footer">
            <p>Общее время
                разработки: <span>{totalHours > 24 ? convertHoursToDays(totalHours) : `${totalHours} ${declinate(totalHours, 'hours')}`}</span>
            </p>
            <button className="footer__btn" type="button" disabled={!isValid}>Отправить бриф
            </button>
        </footer>
    );
};

export default Footer;
