import React from 'react';
import { useDispatch } from 'react-redux';
import './Datepicker.scss';

import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import { formatDate } from '../../../utils/formatDate';
import { checkTask } from '../../../features/data/dataSlice';

const Datepicker = ({ label, id, subsectionId, isRequired }) => {
    const dispatch = useDispatch();

    const handleClose = (dates) => {
        console.log(dates);
        dispatch(checkTask({
            id,
            subsectionId,
            value: [new Date(dates[0]).getTime(), new Date(dates[1]).getTime()],
            type: 'date',
        }))
    }

    return (
        <div className="input-container">
            <label className="label">{label}
                {isRequired && <span className="label__asterisk">*</span>}
            </label>
            <Flatpickr
                options={{
                    locale: Russian,
                    mode: 'range',
                    formatDate: formatDate,
                }}
                placeholder="4 ноября - 4 декабря"
                onClose={handleClose}
            />
        </div>
    );
};

export default Datepicker;
