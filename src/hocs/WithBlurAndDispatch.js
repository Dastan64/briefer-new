import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkTask } from '../features/data/dataSlice';

const WithBlurAndDispatch = (Component) => {
    function NewComponent(props) {
        const { name, id, subsectionId } = props;
        const [hasBlurred, setHasBlurred] = useState(false);
        const [inputValue, setInputValue] = useState('');
        const dispatch = useDispatch();
        const handleBlur = () => setHasBlurred(!hasBlurred);
        const handleChange = ({ target }) => {
            setInputValue(target.value);
        }

        useEffect(() => {
            if (hasBlurred && inputValue) {
                dispatch(checkTask({
                    id,
                    subsectionId,
                    value: inputValue,
                }))
            }
        }, [id, subsectionId, hasBlurred, inputValue, dispatch, name])

        return <Component {...props} onBlur={handleBlur} onChange={handleChange} value={inputValue}/>
    }

    return NewComponent;
}

export default WithBlurAndDispatch;
