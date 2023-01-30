import React from 'react';
import './Textarea.scss';

const Textarea = ({ name, label, id, value, onBlur, onChange, isRequired }) => {

    return (
        <div className="input-container input-container--wide">
            <label htmlFor={id} className="label">{label}{isRequired &&
                <span className="label__asterisk">*</span>}</label>
            <textarea value={value} id={id} className="textarea" name={name} placeholder="Что нужно сделать?"
                      onChange={onChange}
                      onBlur={onBlur}></textarea>
        </div>
    );
};

export default Textarea;
