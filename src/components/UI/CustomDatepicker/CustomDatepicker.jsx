import React from 'react';
import styles from './CustomDatepicker.module.css';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import { formatDate } from '../../../utils/formatDate';

const CustomDatepicker = ({ label, isRequired, icon, iconDirection, variant, onClose, ...props }) => {
    const { id, subsectionId } = props;

    const handleClose = (dates) => onClose(dates, id, subsectionId);

    return (
        <div className={styles.datepickerContainer}>
            {label && <label className={styles.label}>{label} {isRequired && <span>*</span>}</label>}
            <Flatpickr
                style={{ backgroundImage: `url(${icon})` }}
                className={`flatpickr-input ${iconDirection ? `flatpickr-input_icon_${iconDirection}` : ''} ${variant ? `flatpickr-input_${variant}` : ''}`}
                options={{
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
