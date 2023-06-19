import React from 'react';
import styles from './Input.module.css';

const Input = ({
                   label,
                   type = 'text',
                   name,
                   placeholder,
                   id,
                   value,
                   onChange,
                   onBlur,
                   onFocus,
                   isRequired,
                   isDisabled
               }) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>{label}
                {isRequired && <span className={styles.labelAsterisk}>*</span>}
            </label>
            <input
                type={type}
                value={value}
                name={name}
                id={id}
                className={`${styles.input} ${label.toLowerCase().includes('бюджет') ? styles.inputTypeBudget : ''}`}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={isDisabled}
            />
        </div>
    );
};

export default Input;
