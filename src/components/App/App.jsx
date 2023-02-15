import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';

import Brief from '../Form/Brief';
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
            <header>
                <figure className="app__logo-container">
                    <img
                        src="https://www.technodom.kz/under/briefer/brief-logo.svg"
                        alt="TechnoBrief | Брифуем с любовью"
                    />
                </figure>
            </header>
            <main className="app__main">
                <Brief/>
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
