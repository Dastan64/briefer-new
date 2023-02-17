import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkTask } from '../features/data/dataSlice';

const WithBlurAndDispatch = (Component) => {
    function NewComponent(props) {
        const { name, id, subsectionId } = props;
        const [hasBlurred, setHasBlurred] = useState(false);
        const [inputValue, setInputValue] = useState('');
        const dispatch = useDispatch();
        const handleBlur = () => setHasBlurred(true);
        const handleFocus = () => setHasBlurred(false);
        const handleChange = ({ target }) => {
            if (name.toLowerCase().includes('бюджет')) {
                const formattedValue = Number(target.value.replace(/\D/g, '')).toLocaleString();
                setInputValue(formattedValue);
            } else {
                setInputValue(target.value);
            }
        }

        useEffect(() => {
            if (hasBlurred && inputValue) {
                dispatch(checkTask({
                    id,
                    subsectionId,
                    value: inputValue,
                }))
            }
        }, [id, subsectionId, hasBlurred, inputValue, dispatch])

        return <Component {...props} onBlur={handleBlur} onChange={handleChange} onFocus={handleFocus}
                          value={inputValue}/>
    }

    return NewComponent;
}

export default WithBlurAndDispatch;
