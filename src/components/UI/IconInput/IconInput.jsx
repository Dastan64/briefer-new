import React from 'react';
import styles from './IconInput.module.css';

const IconInput = ({ value = '', name, placeholder, icon, onChange }) => {
    return (
        <input
            name={name}
            className={styles.input}
            style={{ backgroundImage: `url(${icon})` }}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default IconInput;
