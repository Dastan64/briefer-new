import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './FileInput.module.css';

import { sendFiles } from '../../../utils/sendFiles';
import { checkTask } from '../../../features/data/dataSlice';

const FileInput = ({ label, name, isRequired = false, id, subsectionId }) => {
    const [fileIds, setFileIds] = useState([]);
    const [value, setValue] = useState('');
    const buttonTextRef = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const callback = (uuidsArray) => setFileIds(uuidsArray)

    useEffect(() => {
        if (fileIds.length > 0) {
            dispatch(checkTask({
                id,
                subsectionId,
                value: fileIds,
            }))
        }
    }, [fileIds, dispatch, id, subsectionId])

    const handleChange = ({ target }) => {
        setValue(target.value);
        sendFiles(target.files, callback);
        buttonTextRef.current.textContent = Array.from(target.files).map(file => file.name).join(', ') || 'Выберите файл (-ы) с устройства';
    }

    const handleClick = () => {
        inputRef.current.click();
        setFileIds([]);
    }

    return (
        <div className="input-container">
            <label htmlFor={name} className="label">{label}:
                {isRequired && <span>*</span>}
            </label>
            <input
                type="file"
                value={value}
                name={name}
                ref={inputRef}
                id={name}
                className={styles.hidden}
                onChange={handleChange}
                multiple
            />
            <button type="button" className={`${styles.button} ${value ? styles.buttonHighlighted : ''}`}
                    onClick={handleClick}>
                <span className={styles.text} ref={buttonTextRef}>Выберите файл (-ы) с устройства</span>
            </button>
        </div>
    );
};

export default FileInput;
