import React, { useEffect, useRef, useState } from 'react';
import './FileInput.scss';
import { sendFiles } from '../../../utils/sendFiles';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../../features/data/dataSlice';

const FileInput = ({ label, name, isRequired, id, subsectionId }) => {
    const [fileIds, setFileIds] = useState([]);
    const [value, setValue] = useState('');
    const buttonTextRef = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const callback = (uuidsArray) => {
        const arr = [...uuidsArray];
        setFileIds([...fileIds, ...arr.splice(0)])
    }

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
    }
    return (
        <div className="input-container">
            <label htmlFor={name} className="label label--file">{label}:
                {isRequired && <span className="label__asterisk">*</span>}
            </label>
            <input
                type="file"
                value={value}
                data-key={label}
                name={name}
                ref={inputRef}
                id={name}
                className="input input--file"
                onChange={handleChange}
                multiple
            />
            <button type="button" className={`file-button ${value ? 'file-button--highlighted' : ''}`}
                    onClick={handleClick}>
                <span className="file-button__text" ref={buttonTextRef}>Выберите файл (-ы) с устройства</span>
            </button>
        </div>
    );
};

export default FileInput;
