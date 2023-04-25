import React from 'react';
import './CustomDatepicker.module.css';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import { formatDate } from '../../../utils/formatDate';

const CustomDatepicker = () => {
    const handleClose = (dates) => {
        console.log(dates);
    }
    return (
        <div>
            <Flatpickr
                options={{
                    altInput: true,
                    locale: Russian,
                    mode: 'range',
                    formatDate: formatDate,
                }}
                placeholder="Дата акции (начало)"
                onClose={handleClose}
            />
        </div>
    );
};

export default CustomDatepicker;
