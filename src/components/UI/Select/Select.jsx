import React, { useEffect, useRef, useState } from 'react';
import './Select.scss';
import { useDispatch, useSelector } from 'react-redux';
import { checkTask } from '../../../features/data/dataSlice';

const Select = ({ slugData, label, defaultValue, subsectionId, id, isRequired }) => {
    const [slug] = useState(slugData.split('_').at(-1))
    const data = useSelector(state => state.data.data[slug]);
    const dispatch = useDispatch();
    const selectRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');
    const [filteredResults, setFilteredResults] = useState(data);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    const selectOption = ({ target }) => {
        setSelectedOption(target.textContent);
        setIsOpen(!isOpen);
        setSearchInputValue('');
    }

    useEffect(() => {
        if (selectedOption) {
            dispatch(checkTask({
                id,
                subsectionId,
                value: selectedOption,
            }));
        }
    }, [selectedOption, dispatch, id, subsectionId])

    useEffect(() => {
        const filteredData = data?.length > 0 && data.filter(item => item.toLowerCase().includes(searchInputValue.toLowerCase()));
        setFilteredResults(filteredData);
    }, [data, searchInputValue])

    useEffect(() => {
        const handleClickOutside = ({ target }) => {
            if (selectRef.current && !selectRef.current.contains(target)) {
                setIsOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);

        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    const handleChange = ({ target }) => {
        setSearchInputValue(target.value);
    }

    return (
        <div className="input-container">
            <span className="label">{label}
                {isRequired && <span className="label__asterisk">*</span>}
            </span>
            <div className={`select ${isOpen ? 'select--active' : ''}`} ref={selectRef}>
                <button type="button" className="select__btn" onClick={handleClick}>
                    <span>{selectedOption || defaultValue}</span>
                    <img width="16" height="16" src="https://www.technodom.kz/under/briefer/chevron.svg" alt=""/>
                </button>
                <div className="select__content">
                    <input value={searchInputValue} className="select__search-input" type="search"
                           onChange={handleChange}
                           placeholder="Давайте поищем..."/>
                    <ul className="select__options">
                        {filteredResults && filteredResults.length > 0 && filteredResults.map((item, index) =>
                            <li key={index} onClick={selectOption}>{item}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Select;
