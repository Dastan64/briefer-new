import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

import Form from '../Form/Form';
import TaskSection from '../TaskSection/TaskSection';
import Footer from '../Footer/Footer';

import { fetchData } from '../../features/data/dataSlice';

const App = () => {
    const data = useSelector(state => state.data.modifiedData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <div className="app">
            <main className="app__main">
                <Form/>
                {data.sections?.length > 0 && data.sections.slice(1).map((section, index) =>
                    <TaskSection
                        section={section}
                        parentIndex={index}
                        key={section.id}/>)}
            </main>
            <Footer/>
        </div>
    );
};

export default App;
