import React, { useState } from 'react';
import './Datepicker.scss';

import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import { formatDates } from '../../../utils/formatDate';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../../features/data/dataSlice';

const Datepicker = ({ label, id, subsectionId, isRequired }) => {
    const [value, setValue] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (date) => {
        setValue([...value, date.at(-1)]);
    };

    const handleClose = () => {
        dispatch(checkTask({
            id,
            subsectionId,
            value: formatDates(value),
        }))
    }

    return (
        <div className="input-container">
            <label className="label">{label}{isRequired &&
                <span className="label__asterisk">*</span>}</label>
            <Flatpickr
                options={{
                    altInput: true,
                    dateFormat: 'd.m.y',
                    locale: Russian,
                    mode: 'range',
                    formatDate: formatDates,
                }}
                placeholder="4 ноября - 4 декабря"
                onChange={handleChange}
                onClose={handleClose}
            />
        </div>
    );
};

export default Datepicker;
