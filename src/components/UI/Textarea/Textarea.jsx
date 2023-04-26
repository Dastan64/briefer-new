import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({ name, label, id, value, onBlur, onChange, isRequired }) => {

    return (
        <div className="input-container input-container--wide">
            <label htmlFor={id} className="label">{label}
                {isRequired && <span>*</span>}
            </label>
            <textarea value={value} id={id} className={styles.textarea} name={name} placeholder="Что нужно сделать?"
                      onChange={onChange}
                      onBlur={onBlur}>
            </textarea>
        </div>
    );
};

export default Textarea;
